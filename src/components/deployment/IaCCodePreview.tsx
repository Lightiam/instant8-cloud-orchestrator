
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Play, FileCode, Download } from 'lucide-react';
import { toast } from 'sonner';

interface IaCCodePreviewProps {
  config: any;
  onDeploy: (provider: string) => void;
  onBack: () => void;
}

export function IaCCodePreview({ config, onDeploy, onBack }: IaCCodePreviewProps) {
  const [selectedProvider, setSelectedProvider] = useState('pulumi');

  const pulumiCode = `import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create VPC
const vpc = new awsx.ec2.Vpc("rag-vpc", {
    cidrBlock: "10.0.0.0/16",
    numberOfAvailabilityZones: 2,
});

// Create security group
const securityGroup = new aws.ec2.SecurityGroup("rag-sg", {
    vpcId: vpc.vpcId,
    description: "Security group for RAG application",
    ingress: [
        {
            protocol: "tcp",
            fromPort: 80,
            toPort: 80,
            cidrBlocks: ["0.0.0.0/0"],
        },
        {
            protocol: "tcp",
            fromPort: 443,
            toPort: 443,
            cidrBlocks: ["0.0.0.0/0"],
        },
        {
            protocol: "tcp",
            fromPort: 22,
            toPort: 22,
            cidrBlocks: ["0.0.0.0/0"],
        },
    ],
    egress: [
        {
            protocol: "-1",
            fromPort: 0,
            toPort: 0,
            cidrBlocks: ["0.0.0.0/0"],
        },
    ],
});

// Create EC2 instance
const instance = new aws.ec2.Instance("rag-instance", {
    instanceType: "t3.large",
    ami: "ami-0c02fb55956c7d316", // Ubuntu 22.04 LTS
    vpcSecurityGroupIds: [securityGroup.id],
    subnetId: vpc.publicSubnetIds[0],
    keyName: "my-key-pair",
    userData: \`#!/bin/bash
        apt-get update
        apt-get install -y docker.io
        systemctl start docker
        systemctl enable docker
        
        # Install RAG application
        docker run -d -p 80:8080 \\
          --name rag-app \\
          -e OPENAI_API_KEY=\${OPENAI_API_KEY} \\
          rag-platform:latest
    \`,
    tags: {
        Name: "RAG-Application-Server",
    },
});

// Create RDS PostgreSQL instance for vector storage
const dbSubnetGroup = new aws.rds.SubnetGroup("rag-db-subnet", {
    subnetIds: vpc.privateSubnetIds,
    tags: {
        Name: "RAG DB subnet group",
    },
});

const database = new aws.rds.Instance("rag-database", {
    allocatedStorage: 20,
    engine: "postgres",
    engineVersion: "14.9",
    instanceClass: "db.t3.micro",
    dbName: "ragdb",
    username: "raguser",
    password: "changeme123!",
    vpcSecurityGroupIds: [securityGroup.id],
    dbSubnetGroupName: dbSubnetGroup.name,
    skipFinalSnapshot: true,
});

// Export outputs
export const instancePublicIp = instance.publicIp;
export const instancePublicDns = instance.publicDns;
export const databaseEndpoint = database.endpoint;
export const applicationUrl = pulumi.interpolate\`http://\${instance.publicDns}\`;`;

  const terraformCode = `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# VPC
resource "aws_vpc" "rag_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "rag-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "rag_igw" {
  vpc_id = aws_vpc.rag_vpc.id

  tags = {
    Name = "rag-igw"
  }
}

# Public Subnet
resource "aws_subnet" "rag_public_subnet" {
  vpc_id                  = aws_vpc.rag_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "rag-public-subnet"
  }
}

# Private Subnet
resource "aws_subnet" "rag_private_subnet" {
  vpc_id            = aws_vpc.rag_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name = "rag-private-subnet"
  }
}

# Route Table
resource "aws_route_table" "rag_public_rt" {
  vpc_id = aws_vpc.rag_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.rag_igw.id
  }

  tags = {
    Name = "rag-public-rt"
  }
}

# Route Table Association
resource "aws_route_table_association" "rag_public_rta" {
  subnet_id      = aws_subnet.rag_public_subnet.id
  route_table_id = aws_route_table.rag_public_rt.id
}

# Security Group
resource "aws_security_group" "rag_sg" {
  name_prefix = "rag-sg"
  vpc_id      = aws_vpc.rag_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rag-security-group"
  }
}

# EC2 Instance
resource "aws_instance" "rag_instance" {
  ami                    = "ami-0c02fb55956c7d316" # Ubuntu 22.04 LTS
  instance_type          = "t3.large"
  key_name               = "my-key-pair"
  subnet_id              = aws_subnet.rag_public_subnet.id
  vpc_security_group_ids = [aws_security_group.rag_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io
              systemctl start docker
              systemctl enable docker
              
              # Install RAG application
              docker run -d -p 80:8080 \\
                --name rag-app \\
                -e OPENAI_API_KEY=\${OPENAI_API_KEY} \\
                rag-platform:latest
              EOF

  tags = {
    Name = "RAG-Application-Server"
  }
}

# RDS Subnet Group
resource "aws_db_subnet_group" "rag_db_subnet_group" {
  name       = "rag-db-subnet-group"
  subnet_ids = [aws_subnet.rag_public_subnet.id, aws_subnet.rag_private_subnet.id]

  tags = {
    Name = "RAG DB subnet group"
  }
}

# RDS PostgreSQL Instance
resource "aws_db_instance" "rag_database" {
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "14.9"
  instance_class         = "db.t3.micro"
  db_name                = "ragdb"
  username               = "raguser"
  password               = "changeme123!"
  vpc_security_group_ids = [aws_security_group.rag_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.rag_db_subnet_group.name
  skip_final_snapshot    = true

  tags = {
    Name = "rag-database"
  }
}

# Outputs
output "instance_public_ip" {
  value = aws_instance.rag_instance.public_ip
}

output "instance_public_dns" {
  value = aws_instance.rag_instance.public_dns
}

output "database_endpoint" {
  value = aws_db_instance.rag_database.endpoint
}

output "application_url" {
  value = "http://\${aws_instance.rag_instance.public_dns}"
}`;

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${filename} downloaded!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Generated Infrastructure Code</h3>
          <p className="text-gray-600 mt-2">Review your Infrastructure as Code before deployment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            Back to Chat
          </Button>
          <Button 
            onClick={() => onDeploy(selectedProvider)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="h-4 w-4 mr-2" />
            Deploy Infrastructure
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Configuration Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">OS:</span>
                <span className="font-medium">{config.os}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CPU:</span>
                <span className="font-medium">{config.cpu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">RAM:</span>
                <span className="font-medium">{config.ram}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage:</span>
                <span className="font-medium">{config.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Region:</span>
                <span className="font-medium">{config.region}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm font-medium mb-2">Estimated Cost</div>
              <div className="text-2xl font-bold text-green-600">$47/month</div>
              <div className="text-xs text-gray-500">EC2 + RDS + Storage</div>
            </div>
          </CardContent>
        </Card>

        {/* IaC Code */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Infrastructure as Code
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Ready to Deploy</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedProvider} onValueChange={setSelectedProvider}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pulumi">Pulumi (TypeScript)</TabsTrigger>
                <TabsTrigger value="terraform">Terraform (HCL)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pulumi" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">index.ts</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(pulumiCode)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadCode(pulumiCode, 'index.ts')}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{pulumiCode}</code>
                </pre>
              </TabsContent>
              
              <TabsContent value="terraform" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">main.tf</h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(terraformCode)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadCode(terraformCode, 'main.tf')}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{terraformCode}</code>
                </pre>
              </TabsContent>
            </Tabs>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-blue-900">Ready for Real Deployment</div>
                  <div className="text-sm text-blue-700 mt-1">
                    This Infrastructure as Code will provision actual AWS resources including EC2 instances, 
                    RDS database, VPC, and security groups. Deployment typically takes 5-10 minutes.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

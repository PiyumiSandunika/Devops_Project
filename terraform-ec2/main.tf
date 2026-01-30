provider "aws" {
  region = "us-east-1"
}

# 1. SMART LOOKUP: Find the latest Ubuntu 24.04 AMI automatically
# (This prevents "Invalid AMI" errors forever)
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical (Official Ubuntu Creator)

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# 2. Security Group (Firewall)
resource "aws_security_group" "devops_sg" {
  name        = "devops-security-group"
  description = "Allow SSH, HTTP, and App ports"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Jenkins Access (Port 8080)
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. SSH Key
resource "aws_key_pair" "deployer" {
  key_name   = "devops-project-key"
  public_key = file("~/.ssh/id_ed25519.pub")
}

# 4. EC2 Instance (Updated to t3.micro)
resource "aws_instance" "web_server" {
  # Use the AMI we found in step 1
  ami           = data.aws_ami.ubuntu.id
  
  # CHANGED: Switched to t3.micro (Newer Free Tier)
  instance_type = "t3.micro"
  
  key_name      = aws_key_pair.deployer.key_name
  security_groups = [aws_security_group.devops_sg.name]

  # Safety setting to ensure it stays free (Standard mode prevents extra charges)
  credit_specification {
    cpu_credits = "standard"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io git
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu
              EOF

  tags = {
    Name = "DevOps-HouseZone-Server"
  }
}

output "server_ip" {
  value = aws_instance.web_server.public_ip
}
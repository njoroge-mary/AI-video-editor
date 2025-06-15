provider "aws" { region = var.aws_region }

resource "aws_s3_bucket" "videos" {
  bucket = var.s3_bucket_name
  acl    = "private"
}

resource "aws_ecs_cluster" "app" {
  name = "video-editor-cluster"
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "backend-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  container_definitions    = file("ecs-task-def.json")
}

resource "aws_ecs_service" "backend_service" {
  name            = "backend-service"
  cluster         = aws_ecs_cluster.app.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 2
  launch_type     = "FARGATE"
  network_configuration {
    subnets         = var.subnet_ids
    security_groups = [var.security_group_id]
  }
}
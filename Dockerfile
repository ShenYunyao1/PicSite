# Dockerfile

# 选择 Node.js 作为基础镜像
FROM node:16 AS backend

# 设置工作目录
WORKDIR /app/backend

# 复制 package.json 和 package-lock.json
COPY backend/package*.json ./

# 安装依赖
RUN npm install

# 复制后端代码
COPY backend/ .

# 构建前端应用
FROM node:16 AS frontend

# 设置工作目录
WORKDIR /app/frontend

# 复制前端 package.json 和 package-lock.json
COPY frontend/package*.json ./

# 安装依赖
RUN npm install

# 复制前端代码
COPY frontend/ .

# 构建前端
RUN npm run build

# 使用 Nginx 作为前端服务器
FROM nginx:alpine

# 复制前端构建结果到 Nginx 目录
COPY --from=frontend /app/frontend/build /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制后端文件
COPY --from=backend /app/backend /app/backend

# 设置工作目录
WORKDIR /app/backend

# 暴露后端端口
EXPOSE 5000

# 启动后端服务
CMD ["node", "server.js"]

# 这个文件的使用方法是：
# 1. 构建前端应用：docker build -t photo-site-frontend -f Dockerfile.frontend .
# 2. 构建后端应用：docker build -t photo-site-backend -f Dockerfile.backend .
# 3. 运行前端应用：docker run -d -p 80:80 --name photo-site-frontend photo-site-frontend
# 4. 运行后端应用：docker run -d -p 5000:5000 --name photo-site-backend photo-site-backend
# 运行方法：
# 1. 启动前端应用：docker start photo-site-frontend
# 2. 启动后端应用：docker start photo-site-backend
# 3. 访问前端应用：http://localhost
# 4. 访问后端应用：http://localhost:5000
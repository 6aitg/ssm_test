# SSM-Test 项目
>本文档用于详细说明 SSM-Test 项目的开发配置、目录结构、架构设计、部署流程等信息，帮助开发者快速上手项目开发与部署。

---

## 目录
- [上手指南](#上手指南)
    - [开发前的配置要求](#开发前的配置要求)
    - [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [开发的架构](#开发的架构)
- [部署](#部署)
- [使用到的框架](#使用到的框架)
- [留言](#留言)

---

## 上手指南
本章节将介绍项目开发前的环境配置要求及具体的安装步骤，确保开发者能够快速搭建开发环境，顺利启动项目。

### 开发前的配置要求
在进行项目开发前，需确保本地环境满足以下配置要求，避免因环境不兼容导致项目无法正常运行：
- JDK：版本 1.8 及以上（推荐 JDK 1.8，兼容性最佳）
- Maven：版本 3.6 及以上（用于项目依赖管理与构建）
- Tomcat：版本 9.x（用于 Web 项目部署与运行）
- MySQL：版本 5.7 或 8.0（用于数据存储，需提前创建数据库）
- 开发工具：IntelliJ IDEA（推荐，支持 Maven、Tomcat 快速配置，提升开发效率）
- 其他：确保网络通畅，以便 Maven 下载所需依赖包

### 安装步骤
按照以下步骤依次操作，即可完成项目的本地安装与启动：
1. **克隆项目**
   从 GitHub 克隆项目到本地指定目录，执行命令：
   ```bash
   git clone https://github.com/6aitg/ssm_test.git
2. **配置环境**：
- 在 IDEA 中打开克隆后的项目，配置 JDK：File → Project Structure → Project，选择本地 JDK 1.8 路径。
- 配置 Maven：File → Settings → Build, Execution, Deployment → Build Tools → Maven，选择本地 Maven 路径及配置文件（settings.xml）。
3. **配置数据库**：
- 打开 MySQL 客户端，创建数据库（建议数据库名：ssm_test）。
- 导入项目中 resources 目录下的 SQL 脚本（若有），创建对应数据表及测试数据。
- 修改 resources/applicationContext.xml 文件中的数据库连接信息，替换 url、username、password 为本地 MySQL 配置。
4. **下载依赖**：在 IDEA 右侧 Maven 面板中，点击「Reload Project」，Maven 将自动下载项目所需的所有依赖包，耐心等待下载完成（若下载缓慢，可配置 Maven 国内镜像）。
5. **配置 Tomcat**：
- 在 IDEA 中添加 Tomcat 服务器：Run → Edit Configurations → + → Tomcat Server → Local。
- 配置 Tomcat 安装路径，添加项目部署：Deployment → + → Artifact，选择项目的 war 包（或 exploded 包）。
- 修改端口号（可选，默认 8080，若端口被占用可修改为 8081、8088 等）。
6. **启动项目**：点击 IDEA 右上角 Tomcat 启动按钮，启动成功后，访问地址：http://localhost:8080/ssm_test/，若能正常显示页面，说明安装启动成功。
   
---

## 文件目录说明
   项目采用标准的 Maven Web 目录结构，结合 SSM 框架分层设计，各目录功能清晰，便于开发与维护，具体目录说明如下：
   ssm_test/
   ├── src/
   │   ├── main/
   │   │   ├── java/
   │   │   │   └── cn/edu/abtu/  # 项目包路径（可替换为自己的包名）
   │   │   │       ├── controller/    # 控制层（接收请求、返回响应，与前端交互）
   │   │   │       ├── service/       # 业务逻辑层（处理核心业务，调用 DAO 层）
   │   │   │       │   └── impl/      # 业务逻辑实现类
   │   │   │       ├── mappers/       # DAO 层（数据访问层，定义数据库操作接口）
   │   │   │       ├── pojo/          # 实体类（与数据库表一一对应，封装数据）
   │   │   │       └── utils/         # 工具类（封装通用方法，如日期工具、字符串工具等）
   │   │   ├── resources/            # 资源目录
   │   │   │   ├── mappers/          # MyBatis 映射文件（编写 SQL 语句，与 DAO 接口对应）
   │   │   │   ├── applicationContext.xml    # Spring 核心配置文件（配置 IOC、事务管理等）
   │   │   │   ├── spring-mvc.xml            # SpringMVC 配置文件（配置处理器映射、视图解析器等）
   │   │   │   ├── mybatis-config.xml        # MyBatis 核心配置文件（配置别名、插件等）
   │   │   │   └── log4j.properties          # 日志配置文件（配置日志输出格式、级别等）
   │   │   └── webapp/               # Web 应用目录
   │   │       ├── css/              # 前端 CSS 样式文件
   │   │       ├── js/               # 前端 JavaScript 文件
   │   │       ├── img/              # 前端图片资源
   │   │       ├── templates/        # 前端页面模板（如 JSP、HTML 文件）
   │   │       └── WEB-INF/          # Web 应用核心配置目录
   │   │           ├── web.xml       # Web 应用部署描述文件
   │   │           └── jsp/          # JSP 页面文件（若使用 JSP 作为视图）
   │   └── test/                    # 单元测试目录（编写测试用例，测试业务逻辑、DAO 接口等）
   │       └── java/                # 测试代码目录，包结构与 main/java 一致
   ├── pom.xml                      # Maven 核心配置文件（管理项目依赖、构建配置等）
   └── README.md                    # 项目说明文档（本文档）

---

## 开发的架构
   本项目采用 SSM（Spring + SpringMVC + MyBatis）三层架构，严格遵循 MVC（Model-View-Controller）设计模式，分层清晰、职责明确，便于代码复用、维护与扩展，具体架构说明如下：
1. **表现层（Controller 层）**：
   对应项目中的 controller 包，主要负责接收前端发送的 HTTP 请求，解析请求参数，调用业务逻辑层（Service 层）的方法，处理响应结果并返回给前端（如跳转页面、返回 JSON 数据等）。核心职责：请求接收、参数校验、响应处理，不包含复杂业务逻辑。
2. **业务逻辑层（Service 层）**：
   对应项目中的 service 包（含 impl 实现类），是项目的核心业务处理层，负责封装业务逻辑，调用数据访问层（DAO 层）的方法获取数据，进行业务判断、数据处理后，将结果返回给表现层。核心职责：业务逻辑实现、事务管理（由 Spring 统一管理），隔离表现层与数据访问层。
3. **数据访问层（DAO 层 / Mapper 层）**：
   对应项目中的 mappers 包，负责与数据库交互，定义数据库操作接口（如查询、新增、修改、删除），通过 MyBatis 映射文件编写 SQL 语句，实现数据的持久化操作。核心职责：数据访问、SQL 执行，不包含业务逻辑。
4. **实体层（POJO 层）**：
   对应项目中的 pojo 包，实体类与数据库表一一对应，封装数据库表的字段，提供 getter/setter 方法，用于数据的传递与存储（如接收前端参数、存储数据库查询结果）。
5. **工具层（Utils 层）**：
   对应项目中的 utils 包，封装通用的工具方法（如日期格式化、字符串处理、加密解密等），供其他层调用，减少代码冗余。
   架构优势：分层清晰、职责单一，降低各层之间的耦合度，便于后期需求迭代与代码维护；Spring 实现依赖注入与事务管理，MyBatis 简化数据库操作，SpringMVC 简化前端交互，提升开发效率。
   
---

## 部署
   本项目支持本地部署与服务器部署，以下分别介绍两种部署方式的具体步骤，适用于开发测试与生产环境。
1. **本地部署（开发测试用）**
   本地部署步骤与「安装步骤」一致，核心是通过 IDEA 配置 Tomcat，部署项目并启动，适用于开发过程中的调试与测试，具体可参考「上手指南 - 安装步骤」。
2. **服务器部署（生产环境用）**
   服务器部署需提前准备一台服务器（推荐 Linux 系统，如 CentOS、Ubuntu），并安装好 JDK、Tomcat、MySQL 环境，具体步骤如下：
         1. 打包项目：在本地 IDEA 中，通过 Maven 打包项目，执行命令 mvn clean package，打包完成后，在项目 target 目录下生成 war 包（如 SSM-Test.war）。
         2. 上传 war 包：通过 Xshell、FileZilla 等工具，将 target 目录下的 war 包上传到服务器的 Tomcat/webapps 目录下。
3. **配置数据库**：
- 在服务器上启动 MySQL 服务，创建数据库并导入 SQL 脚本。
- 修改 war 包中 resources/applicationContext.xml 文件的数据库连接信息，确保与服务器 MySQL 配置一致（可先解压 war 包修改，再重新打包上传）。
4. **启动 Tomcat**：进入服务器 Tomcat/bin 目录，执行启动命令 ./startup.sh（Linux 系统）或 startup.bat（Windows 服务器），Tomcat 会自动解压 webapps 目录下的 war 包。
5. **访问项目**：在浏览器中输入http://服务器IP:端口号/ssm_test/，若能正常显示页面，说明部署成功。
6. **停止与重启**：
- 停止 Tomcat：执行命令 ./shutdown.sh（Linux 系统）。
- 重启 Tomcat：先停止 Tomcat，再启动 Tomcat 即可。
> 注意：服务器需开放 Tomcat 端口（如 8080）和 MySQL 端口（如 3306），避免防火墙拦截导致无法访问。
   
---

## 使用到的框架
    本项目基于 SSM 框架开发，同时引入了其他常用工具与依赖，所有依赖均通过 Maven 管理，具体如下：
- 核心框架：
    - Spring：版本 5.3.x，用于依赖注入、事务管理、AOP 等，是项目的核心容器。
    - SpringMVC：版本 5.3.x，用于处理前端请求、视图解析、参数绑定等，实现表现层与业务层的解耦。
    - MyBatis：版本 3.5.x，用于简化数据库操作，实现数据持久化，支持 SQL 编写与参数映射。
- 数据库相关：
    - MySQL：版本 5.7/8.0，关系型数据库，用于存储项目数据。
    - MyBatis 分页插件（PageHelper）：用于实现数据库分页查询，简化分页逻辑。
    - 数据库连接池（Druid）：用于管理数据库连接，提升数据库访问效率，防止连接泄露。
- 日志相关：
    - Log4j：用于项目日志输出，便于开发调试与问题排查。
- 其他依赖：
    - JSTL：用于 JSP 页面标签库，简化页面逻辑。
    - Servlet API：用于 Web 项目请求与响应处理。
    - FastJSON：用于 JSON 数据解析与转换（若有前后端 JSON 交互需求）。
      所有依赖的版本信息均可在项目 pom.xml 文件中查看与修改，确保各依赖版本兼容。
  
---
## 留言
    欢迎大家交流学习、提出建议：
- GitHub 地址：https://github.com/6aitg
- 邮箱：3656540009@qq.com

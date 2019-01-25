# Development Task Manager (DTM)
This is an Open source Task Management Tool, It's basically build for break down our Software Development Issue Into Small part
so that developer can estimate their estimation very precisely and not happen the deadline miss, also team lead able to monitor
task status closely for complete the Iteration perfectly. 


<br/>
<br/>

## Tools & Technologies
1. **Web Framework [Groovy & Grails](https://grails.org/)**
2. **UI Library [ReactJS](https://reactjs.org/)**
3. **UI Design [Material UI](https://material-ui.com/)**
4. **Database [MySQL](https://www.mysql.com/)**
5. **API Definition Swagger Library [GrailsSwagger](https://github.com/hmtmcse/grails-swagger/)**


<br/>
<br/>

## How to Start Project Source
1. Open the [Git Bash](https://git-scm.com/downloads) / any Git client / Terminal / Console
2. Go to the destination directory where want to clone the project
3. Download the file using curl or wget. curl example: ```curl https://url -o clone.sh```
4. Run the clone.sh file. Example: ```sh clone.sh```
5. If everything above command successfully run then will get a Directory named **DTM**, Here is all of source codes
6. This a Gradle Project so need to open this project as Gradle Project. **[IntelliJ IDEA](https://www.jetbrains.com/idea/download)**, **[Eclipse](https://www.eclipse.org/downloads/)**
7. Here used Database as MySQL so need to configure the Database name, DB username, DB password, config file in **project-root/grails-app/conf/application.yml**. Below added Example of config YML
```yaml
dataSource:
    username: root
    password: ''

environments:
    development:
        dataSource:
            url: "jdbc:mysql://localhost/development_task_manager?useUnicode=yes&characterEncoding=UTF-8"    
```
8. Create a database into the MySQL.
9. Run the Project. it will be run **http://localhost:1122** Url
10. We may use Gradle Wrapper for Run Directly. Example: From project root directory run the command ``````


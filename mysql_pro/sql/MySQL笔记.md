SQL分类

* DDL（Data Definition Language）数据定义语言

   用来定义数据库对象：数据库，表，列等。关键字：create,drop,alter等

* DML（Data Manipulation Language）数据操纵语言

   用来对数据库中表的数据进行增删改。关键字：insert.delete,update等

* DQL（Data Query Language）数据查询语言

   用来查询数据库中表的记录（数据）。关键字：select,where等

* DCL（Data Control Language）数据控制语言

   用来定义数据库的访问权限和安全级别，及创建用户。关键字：GRANT,REVOKE等

### DDL

#### 库

##### 创建

* 创建数据库，判断是否存在，并指定字符集：

  ```sql
   create database [if not exists] 数据库名 [character set 字符集名]; 
  ```

##### 查询

* 查询所有数据的名称：

  ```sql
  show databases;
  ```

* 查询某个数据库的创建语句

  ```sql
  -- 可以查询字符集
  show create database 数据库名称; 
  ```

##### 修改

* 修改数据库的字符集：

  ```sql
   alter database 数据库名 character set 字符集;
  ```

##### 删除

* 判断数据库存在，存在再删除：

  ```sql
  drop database [if exists] 数据库名称;
  ```

* 使用数据库

  ```sql
  use 数据库名称;
  ```

* 查询当前正在使用的数据库名称

  ```sql
   select database();
  ```

#### 表

##### 创建

```sql
create table 表名(
   列名1 数据类型1 约束，
   列名2 数据类型2
)charset set 字符集;

-- 创建指定时间字段
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

* 数据类型：

  * int:整数类型

    >  age int,

  * double：小数类型

    > score double(5,2)

  * date：日期，只包含年月日，yyyy-MM-dd

  * datetime：日期，包含年月日时分秒 yyyy-MM-dd HH:mm:ss

  * timestamp：时间戳类型 包含年月日时分秒 yyyy-MM-dd HH:mm:ss

  * varchar：字符串

    >  name varchar(20)：姓名最大20字符

* 练习：创建表

  ```sql
  create table student(
       id int,
       name varchar(32),
       age int,
       score double(4,1),
       birthday date,
       insert_time timestamp
  );
  ```

##### 复制表

  ```sql
  -- 创建一个和旧表结构相同的表
  create table if not exists 表名 
  like 被复制的表名;
  -- 将查询结果保存到一张新表
  create table if not exists 表名
  select * from sc;
  ```

##### 查询

```sql
-- 查询某个数据库中所有的表名称
show tables;
-- 查询表结构
desc 表名;
-- 建表语句
show create table 表名;
```

##### 修改

* 修改表名

  ```
   alter table 表名 rename to 新表名;
  ```

* 修改表的字符集

  ```
  alter table 表名 character set 字符集名称;
  ```

* 查看某张表的字符集

  ```
  show create table 表名;
  ```

* 添加一列

  ```
  alter table 表名 add 列名 数据类型 约束;
  ```

* 修改列名称 类型

  ```
  alter table 表名 change 列名 新列名 新数据类型;
  
  alter table 表名 modify 列名 新数据类型;
  ```

* 删除列

  ```
   alter table 表名 drop 列名;
  ```

* D(Delete)：删除

  ```
  drop table 表名;
  
  drop table if exists 表名;
  ```

### DML

##### 添加数据

```sql
-- 插如数据
insert into 表名[(列名1，列名2，列名3，......,列名n)[] values(值1,值2,......值n);

-- 插入查询的记录
insert into 表名
select statement;
```

##### 删除数据

```sql
delete from 表名 [where条件]
```

使用 `TRUNCATE TABLE` 删除表的数据时，实际上是删除了表中的所有行，但保留了表的结构（列定义、索引、主键等）

##### 修改数据

```sql
update 表名 set 列名1 = 值1,列名2 = 值2 [where条件];
```

### DQL

```sql
5 SELECT [distinct]
	column1 [as xxx], ...        也可以做运算  +-*/   concat(有空则结果为空)  等等 
1 FROM 
	table_name
2 WHERE 
	condition
3 GROUP BY 
	column1 [] , ...
4 HAVING 
	condition
6 ORDER BY 
	column1 [desc|asc] , ...
7 LIMIT 
	n 
7 OFFSET 
	m;
```

#### 函数

```sql
-- 可以用在select中
concat()
if(express,result1,result2)

-- 条件函数  对NULL值的处理
ifnull() 可以对空置进行处理
IF(): 根据条件返回不同的值。

-- 对数值进行处理
ABS(): 返回一个数的绝对值。
ROUND(): 对一个数进行四舍五入。
CEIL()（或 CEILING()）: 向上取整。
FLOOR(): 向下取整。
RAND(): 返回一个 0 到 1 之间的随机数

-- 对字符串处理
CONCAT(): 将多个字符串连接在一起。
LENGTH()（或 LEN()）: 返回字符串的长度。
SUBSTRING(): 提取字符串的子串。
UPPER(): 将字符串转换为大写。
LOWER(): 将字符串转换为小写。
```

#### 过滤

```sql
>、<、<=、>=、=、<>、<=>
BETWEEN...AND
IN(集合)
LIKE：模糊查询
	   _:单个任意字符
	   %：多个任意字符
rlike 正则匹配
IS NULL
IS NOT NULL
注意 null 和 空字符串'' 的区别
and
or
not   
```

#### 排序

* 语法：order by 子句

  > order by 排序字段1 排序方式1，排序字段2 排序方式2...

* 排序方式：

  * ASC：升序，默认的

  * DESC：降序   

* 注意：

  > 如果又多个排序条件，则当前边的条件值一样时，才会判断第二条件

#### 聚合函数

> 注意：聚合函数的计算，排除null值（可使用ifnull函数）

* `COUNT()`: 返回行的数量。不统计null值 。 count(distinct 字段) 统计去重。
* `SUM()`: 计算总和。
* `AVG()`: 计算平均值。
* `MIN()`: 返回最小值。
* `MAX()`: 返回最大值。

#### 分组

* 语法：group by 分组字段

* 注意：

  > 1.分组之后查询的字段：分组字段、聚合函数
  >
  > 2.where和having的区别？
  >
  > ​        where在分组之前进行限定，如果不满足条件，则不参与分组。
  >
  > ​        having在分组之后进行限定，如果不满足结果，则不会被查询出来
  >
  > ​        where后不可以跟聚合函数，having可以进行聚合函数的判断

* 例：

  *  按照性别分组，分别查询男、女同学的平均分

    ​	```SELECT sex,AVG(math) FROM student GROUP BY sex;```

  * 按照性别分组，分别查询男、女同学的平均分，人数

    ```
    SELECT sex,AVG(math),COUNT(id) FROM student GROUP BY sex;
    ```

  * 按照性别分组，分别查询男、女同学的平均分，人数 要求：分数不低于70分的人，不参与分组。

    ```
    SELECT sex,AVG(math),COUNT(id) FROM student WHERE math>70  GROUP BY sex;
    ```

  * 按照性别分组，分别查询男、女同学的平均分，人数 要求：分数不低于70分的人，不参与分组，分组之后，人数大于2人。

    ```
    SELECT sex,AVG(math),COUNT(id) FROM student WHERE math>70  GROUP BY sex HAVING COUNT(id)>2;
    ```

#### 分页

* 语法：limit 开始的索引，每页查询的条数

* 公式：开始的索引 = （当前的页码 -1） * 每页显示的条数

* 例：

  * 每页显示3条记录 

    ```
    SELECT * FROM student LIMIT 0,3; 第一页
    
    SELECT * FROM student LIMIT 3,3;  第二页
    
    SELECT * FROM student LIMIT 6,3;  第三页
    ```

#### 	子查询、联合

### DCL

#### 管理用户

```sql
-- 关闭密码复杂验证
set global validate_password_policy=0;
set global validate_password_length=1;

-- 添加用户
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';

-- 删除用户
DROP USER '用户名'@'主机名';

-- 修改用户密码
-- 老版本的写法 
-- UPDATE USER SET PASSWORD = PASSWORD('新密码') WHERE USER = '用户名';
SET PASSWORD FOR '用户名'@'主机名' = PASSWORD('新密码');

-- 查询用户
USE mysql;
select * from user;
```

#### 权限管理

```sql
-- 查询权限
show grants for "用户名"@"主机名";

-- 授权
-- with grant option 表示带上授权的功能
-- 通配符： % 表示可以在任意主机使用用户登录数据库 "111.111.111.111"@"%"
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名' [with grant option];

-- 撤销权限
revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名';

注意：为了使权限更改生效，需要在运行 GRANT 语句后执行 FLUSH PRIVILEGES;。这样可以刷新 MySQL 的权限缓存，使新的权限设置立即生效。
```

* 例子：  

  ```sql
  -- 将表db3.account的SELECT ,DELETE, UPDATE权限授予用户'lisi'@'%'
  GRANT SELECT ,DELETE, UPDATE  ON db3.account TO 'lisi'@'%';
  
  -- 给zhangsan用户所有权限  
  GRANT ALL PRIVILEGES ON *.* TO 'zhangsan'@'localhost'
  ```


### 多表查询

* 准备sql:

  ```
  -- 创建部门表
  CREATE TABLE dept(
     id INT PRIMARY KEY auto_increment,
     NAME VARCHAR(20)
  );
  -- 插入数据
  INSERT INTO dept(NAME) VALUES ('开发部'),('市场部'),('财务部'); 
  
  
  -- 创建员工表
  CREATE TABLE emp(
     id INT PRIMARY KEY auto_increment,
     NAME VARCHAR(10),
     gender CHAR(1),  -- 性别
     salary DOUBLE,  -- 工资
     join_date DATE, -- 入职日期
     dept_id INT,
     FOREIGN KEY(dept_id) REFERENCES dept(id)  -- 外键，关联部门表的主键
  );
  -- 插入数据
  INSERT INTO emp(NAME,gender,salary,join_date,dept_id) 
  VALUES 	('孙悟空','男',7200,'2013-02-24',1),
   		('猪八戒','男',3600,'2010-12-02',2),
   		('唐僧','男',9000,'2008-08-08',2),
   		('白骨精','女',5000,'2015-10-07',3),
   		('蜘蛛精','女',4500,'2011-03-14',1);
  ```

* 笛卡尔积：

  > 有两个集合A,B 取这两个集合的所有组成情况。
  >
  > 例如：
  >
  > A：(a,b,c)
  >
  > B：(1,2,3)
  >
  > A与B作笛卡尔积---> a,1 a,2 a,3 b,1 b,2 b,3 c,1 c,2 c,3

**要完成多表查询，需要消除无用的数据**

* 1.内连接查询：

  * 隐式内连接：使用where条件消除无用数据

    ```
    --  查询所有员工信息和对应的部门信息
    SELECT * FROM emp,dept WHERE emp.dept_id=dept.id;
    
    -- 查询员工表的名称，性别。部门表的名称
    SELECT 	emp.`NAME`
    		,emp.gender
    		,dept.`NAME` 
    FROM emp,dept WHERE emp.dept_id=dept.id;
    
    -- 或者
    SELECT	t1.`NAME`
    		,t1.gender
    		,t2.`NAME`
    FROM emp t1,dept t2
    WHERE t1.dept_id=t2.id;
    ```

  * 显式内连接：

    ```
    --语法：select 字段列表 from 表名1 [inner] join 表名2 on 条件
    
    SELECT * FROM emp INNER JOIN dept ON emp.dept_id=dept.id;
    ```

* 2.外连接查询：

  * 左外连接：

    ```
    --语法：select 字段列表 from 表1 left [outer] join 表2 on 条件；
    
    --查询的是左表所有数据以及其交集部分。 
    ```

  * 右外连接：

    ```
    --语法：select 字段列表 from 表1 right [outer] join 表2 on 条件；
    
    --查询的是右表所有数据以及其交集部分。
    ```

* 3.子查询：

  > 查询中嵌套查询，称嵌套查询为子查询。

  ```
  -- 查询工资最高的员工信息
  
  -- 1.查询最高的工资是多少 9000
  SELECT MAX(salary) FROM emp;
   
  -- 2.查询员工信息，并且工资等于9000的
  SELECT * FROM emp WHERE emp.salary=9000;
  
  -- 一条sql就完成这个操作
  SELECT * FROM emp WHERE emp.salary = (SELECT MAX(salary) FROM emp);
  ```

  子查询不同情况:

  * 子查询的结果是单行单列的： 

    ```
    --子查询可以作为条件，使用运算符去判断。  运算符：> >= < <= =
    
    --查询员工工资小于平均工资的人
    SELECT * FROM emp WHERE emp.salary < (SELECT AVG(salary) FROM emp);
    ```

  * 子查询的结果是多行单列的：

    ```
    --子查询可以作为集合，使用in、not int
    
    --查询财务部和市场部所有员工信息
    SELECT id FROM dept WHERE `NAME`='财务部' OR `NAME`='市场部';
    SELECT * FROM emp WHERE dept_id=3 OR dept_id=2;
    
    --使用子查询
    SELECT * FROM emp WHERE dept_id in (SELECT id FROM dept WHERE `NAME`='财务部' OR `NAME`='市场部');
    ```

  * 子查询的结果是多行多列的

    ```
    --子查询可以作为一张虚拟表参与查询
    --查询员工入职日期是2011-11-11日之后的员工信息和部门信息
    
    -- 子查询
    select * from dept t1 (select * from emp where emp.join_date > '2011-11-11') t2 where t1.id = t2.dept_id;
    
    --普通内连接查询
    select * from emp t1,dept t2 where t1.dept_id = t2.id and t1.join_date > '2011-11-11'  
    ```

* 表的拼接

  > 拼接时两张表的结构必须完全一致

  * union 对数据进行去重
  * union all

#### 使用Python操作MySQL

##### 1、安装第三方模块pymysql

```shell
pip install pymysql
```

##### 2、操作MySQL

```python
import pymysql

# 创建连接
# 需要传入一些参数：
# host mysql所在的主机名或者是域名或者是ip地址
# port mysql运行的端口号
#        ps -aux | grep mysql 找到MySQL运行的进程号
#        netstat -tnlp | grep mysql的进程号 找到MySQL的端口
# user 用户名
# passwd 密码
# db 指定要操作的数据库
conn = pymysql.connect(host='master', port=3306, user='root', passwd='123456',db='stu_test')

# 创建游标cursor
cur = conn.cursor()
# cur.execute("use stu_test") # 切换数据库
# 准备SQL语句
sql_str1 = '''
SELECT	t1.sid
        ,t1.sname
        ,t2.score
from (
    SELECT	sid
            ,sname
    from Student
    where sid in (
        select  t1.sid
        from (
            SELECT  sid
                    ,score
            from SC
            where cid = '01'
        ) t1 left join (
            SELECT  sid
                    ,score
            from SC
            where cid = '02'
        ) t2 on t1.sid = t2.sid
        where t1.score > ifnull(t2.score,0)
    )
) t1 left join SC t2 on t1.sid = t2.sid
'''

# 执行SQL语句
cur.execute(sql_str1)

# 如果有返回值 可以通过cursor进行获取
print(cur.fetchone())  # 获取一条数据
print('#' * 50)
print(cur.fetchall())  # 获取所有数据
print('#' * 50)
print(cur.fetchmany(10))  # 获取指定大小的数据数据

# 如果没有返回值，看后续自己处理

# 

```



#### JDBC连接

##### Maven依赖

```
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<version>5.1.49</version>
</dependency>
```

##### 示例代码

```
package com.shujia;

import java.sql.*;

public class MySQLJDBCDemo {
    public static void main(String[] args) throws Exception {
        // 1、加载驱动
        Class.forName("com.mysql.jdbc.Driver");

        // 2、创建连接
        Connection conn = DriverManager.getConnection("jdbc:mysql://master:3306/db1?useSSL=false","root","123456");

        // 3、创建Statement

        Statement st = conn.createStatement();

        // 4、通过Statement执行SQL
        ResultSet rs = st.executeQuery("select * from student");

        // 5、遍历ResultSet 获取返回的记录
        while (rs.next()) {
            int id = rs.getInt("id");
            String name = rs.getString("name");
            int age = rs.getInt("age");
            String gender = rs.getString("gender");
            String clazz = rs.getString("clazz");

            System.out.println(id+","+name+","+age+","+gender+","+clazz);
        }

        // 6、关闭连接
        st.close();
        conn.close();


    }
}
```

#### JDBC连接池

##### 1、连接池是什么？

连接池是创建和管理一个连接的缓冲池的技术，这些连接准备好被任何需要它们的线程使用。 连接池用于提高在数据库上执行命令的性能。连接池本质上就是数据库连接的缓存。使用数据库连接时，如果池中有一个可用，它将使用该连接而不是重新建立另一个新的连接 ，用完后不是关闭它，而是将其放回池中。

> 打开和关闭数据库连接可能看起来不是昂贵的费用，但它可以累加起来。假设建立连接需要5ms，执行查询需要5ms（完全编号），50％的时间是建立连接。将此扩展到数千或数万个请求，就会浪费了大量网络时间。

##### 2、为什么要用连接池？

* **资源重用**：由于数据库连接得以重用，避免了频繁创建，释放连接引起的大量性能开销。在减少系统消耗的基础上，另一方面也增加了系统运行环境的平稳性。
* **更快的系统反应速度**:数据库连接池在初始化过程中，往往已经创建了若干数据库连接置于连接池中备用。此时连接的初始化工作均已完成。对于业务请求处理而言，直接利用现有可用连接避免了数据库连接初始化和释放过程的时间开销，从而减少了系统的响应时间
* **新的资源分配手段**：对于多应用共享同一数据库的系统而言，可在应用层通过数据库连接池的配置实现某一应用最大可用数据库连接数的限制避免某一应用独占所有的数据库资源.
* **统一的连接管理**：避免数据库连接泄露在较为完善的数据库连接池实现中，可根据预先的占用超时设定，强制回收被占用连接，从而避免了常规数据库连接操作中可能出现的资源泄露。

##### 3、常见的数据库连接池？

* **proxool**

  > 更新时间截止2008年。速度可以，稳定性稍差，发较高的情况下会出错。

* **c3p0**

  > 太古老，代码及其复杂，不利于维护。貌似都比它强。

* **dbcp**

  > apache上的 java 连接池项目，也是 tomcat 使用的连接池组件。

* **druid**

  > alibaba出品的功能比较全面且扩展性较好的数据库连接池，比较方便对jdbc接口进行监控跟踪等

* **BoneCP**

  > 2013年前最快的连接池项目。2013年后不再更新，心灰意冷。

* **HikariCP**

  > 光连接池，目前被SpringBoot2官方推荐使用的数据库连接池。

##### 4、各数据库连接池**测试结论** 

* 1：性能方面 HikariCP>Druid>tomcat-jdbc>dbcp>c3p0 。

  > hikariCP的高性能得益于最大限度的避免锁竞争。

* 2：druid功能最为全面，sql拦截等功能，统计数据较为全面，具有良好的扩展性。

* 3：综合性能，扩展性等方面，可考虑使用druid或者hikariCP连接池。

* 4：可开启prepareStatement缓存，对性能会有大概20%的提升。

##### 5、HikariCP连接池的使用

> 官网地址：https://github.com/brettwooldridge/HikariCP

###### Maven依赖

```
<dependency>
   <groupId>com.zaxxer</groupId>
   <artifactId>HikariCP</artifactId>
   <version>4.0.3</version>
</dependency>
```

###### 连接池初始化

```
// 配置
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://master:3306/db1");
config.setUsername("root");
config.setPassword("123456");
config.addDataSourceProperty("connectionTimeout", "1000"); // 连接超时：1秒
config.addDataSourceProperty("idleTimeout", "60000"); // 空闲超时：60秒
config.addDataSourceProperty("maximumPoolSize", "16"); // 最大连接数：16
config.addDataSourceProperty("useSSL", "false"); // 关闭使用SSL连接

// 创建连接池实例
DataSource ds = new HikariDataSource(config);
```

###### 使用连接池

```
try (Connection conn = ds.getConnection()) { // 通过ds获取连接
    ...
} // 在此“关闭”连接
```

#### 索引

> MySQL索引的建立对于MySQL的高效运行是很重要的，索引可以大大提高MySQL的检索速度。

##### 普通索引

###### 创建索引

```
CREATE INDEX indexName ON table_name (column_name)
```

###### 修改表结构(添加索引)

```
ALTER table tableName ADD INDEX indexName(columnName)
```

###### 创建表的时候直接指定

```
CREATE TABLE mytable(  
 
ID INT NOT NULL,   
 
username VARCHAR(16) NOT NULL,  
 
INDEX [indexName] (username(length))  
 
);  
```

###### 删除索引的语法

```
DROP INDEX indexName ON mytable; 
```

------

##### 唯一索引

它与前面的普通索引类似，不同的就是：索引列的值必须唯一，但允许有空值。如果是组合索引，则列值的组合必须唯一。它有以下几种创建方式：

###### 创建索引

```
CREATE UNIQUE INDEX indexName ON mytable(username(length)) 
CREATE INDEX I
```

###### 修改表结构

```
ALTER table mytable ADD UNIQUE [indexName] (username(length))
```

###### 创建表的时候直接指定

```
CREATE TABLE mytable(  
 
ID INT NOT NULL,   
 
username VARCHAR(16) NOT NULL,  
 
UNIQUE [indexName] (username(length))  
 
);  
```

------

##### 使用ALTER 命令添加和删除索引

有四种方式来添加数据表的索引：

- **ALTER TABLE tbl_name ADD PRIMARY KEY (column_list):**

  > 该语句添加一个主键，这意味着索引值必须是唯一的，且不能为NULL，

- **ALTER TABLE tbl_name ADD UNIQUE index_name (column_list):** 

  > 这条语句创建索引的值必须是唯一的（除了NULL外，NULL可能会出现多次）。

- **ALTER TABLE tbl_name ADD INDEX index_name (column_list):** 

  > 添加普通索引，索引值可出现多次。

- **ALTER TABLE tbl_name ADD FULLTEXT index_name (column_list):**

  > 该语句指定了索引为 FULLTEXT ，用于全文索引。

以下实例为在表中添加索引。

```
ALTER TABLE testalter_tbl ADD INDEX (c);
```

你还可以在 ALTER 命令中使用 DROP 子句来删除索引。尝试以下实例删除索引:

```
ALTER TABLE testalter_tbl DROP INDEX c;
```

------

##### 使用ALTER 命令添加和删除主键

主键作用于列上（可以一个列或多个列联合主键），添加主键索引时，你需要确保该主键默认不为空（NOT NULL）。实例如下：

```
ALTER TABLE testalter_tbl MODIFY i INT NOT NULL;
ALTER TABLE testalter_tbl ADD PRIMARY KEY (i);
```

你也可以使用 ALTER 命令删除主键：

```
ALTER TABLE testalter_tbl DROP PRIMARY KEY;
```

删除主键时只需指定PRIMARY KEY，但在删除索引时，你必须知道索引名。

------

##### 显示索引信息

你可以使用 SHOW INDEX 命令来列出表中的相关的索引信息。可以通过添加 \G 来格式化输出信息。

尝试以下实例:

```
SHOW INDEX FROM table_name;
```

#### 约束

  **概念：对表中的数据进行限定，保证数据的正确性、有效性和完整性。**

* 分类：

  * 1.主键约束：primary key

  * 2.非空约束：not null
  * 3.唯一约束：unique
  * 4.外键约束：foreign key

##### 非空约束：not null，值不能为null

* 1.创建表时添加约束

  ```
  CREATE TABLE stu(
     id INT,
     NAME VARCHAR(20) NOT NULL  -- name为非空
  );
  ```

* 2.创建表完后，添加非空约束

  ```
  ALTER TABLE stu MODIFY NAME VARCHAR(20) NOT NULL;
  ```

* 3.删除name的非空约束

  ```
  ALTER TABLE stu MODIFY NAME VARCHAR(25);
  ```

##### 唯一约束：unique，值不能重复

* 1.创建表时添加唯一约束

  ```
  CREATE TABLE stu(
     id INT,
     phone_num VARCHAR(20) UNIQUE  -- 添加了唯一的约束
  );
  ```

  > 注意mysql中，唯一约束限定的列的值可以有多个null
  >
  > MySQL默认也会对UNIQUE的列建立索引

* 2.删除唯一约束

  ```
  alter table stu modify phone_num varchar(20);
  -- 若无法删除可先将索引删除
  ALTER TABLE stu DROP INDEX phone_num;
  ```

* 3.在创建表后，添加唯一约束

  ```
  ALTER TABLE stu MODIFY phone_nume VARCHAR(20) UNIQUE;
  ```

##### 主键约束：primary key

* 1.注意：

  >  含义：非空且唯一
  >
  >  主键就是表中记录的唯一标识

* 2.在创建表时，添加主键约束

  ```
  CREATE TABLE stu (
     id INT PRIMARY KEY,  -- 给id添加主键约束
     NAME VARCHAR(20)
  );
  ```

* 3.删除主键

  ```
  ALTER TABLE stu DROP PRIMARY KEY; -- 去除主键
  alter table stu modify id int; -- 移除not null的限约束
  ```

* 4.创建完表后，添加主键

  ```
  ALTER TABLE stu MODIFY id INT PRIMARY KEY;  
  ```

* 5.自动增长：

  * 1.概念：如果某一列时数值类型的，使用auto_increment可以来完成值的自动增长

  * 2.在创建表时，添加主键约束，并且完成主键自动增长

    ```
    CREATE TABLE stu(
        id INT PRIMARY KEY AUTO_INCREMENT,  -- 给id添加主键约束  并完成主键自动增长
        NAME VARCHAR(20)
    );
    ```

  * 3.删除自动增长

    ```
    ALTER TABLE stu MODIFY id INT;
    ```

  * 4.添加自动增长

    ```
    ALTER TABLE stu MODIFY id INT AUTO_INCREMENT;
    ```

##### 外键约束：foreign key，让表与表产生关系，从而保证数据的正确性。

* 1.在创建表时，可以添加外键

  ```
  create table 表名(
  
     ...
  
     外键列
  
     constraint 外键名称 foreign key (外键列名称) references 主表名称(主表列名称) 
  
  );
  ```

* 2.删除外键

  ```
  ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
  ```

* 3.创建表之后，添加外键

  ```
  ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键列名称) REFERENCES 主表名称(主表列名称) ;
  ```

* 4.级联操作

  * 添加级联操作

    ```
    ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键列名称) REFERENCES 主表名称（主表列名称） ON UPDATE CASCADE ON DELETE CASCADE;
    ```

  * 分类：

    ```
    级联更新：ON UPDATE CASCADE
    
    级联删除：ON DELETE CASCADE
    ```

#### 数据库的设计

##### 1.多表之间的关系

* 一对一（了解）

  如：人和身份证

  分析：一个人只有一个身份证，一个身份证只能对应一个人

* 一对多（多对一）

  如：部门和员工

  分析：一个部门有多个员工，一个员工只能对应一个部门

* 多对多

  如：学生和课程

  分析：一个学生可以选择很多门课程，一个课程也可以被很多学生选择

##### 2.实现关系

* 一对多（多对一）

  如：部门和员工

  实现方式：在多的一方建立外键，指向一另一方的主键。

* 多对多

  如：学生和课程

  实现方式：多对多关系实现需要借助第三张中间表。中间表至少包含两个字段，

  这两个字段作为第三张表的外键，分别指向两张表的主键。

* 一对一（了解）  

  如：人和身份证

  实现方式：一对一关系实现，可以在任意一方添加唯一外键指向另一方的主键。

##### 3.数据库设计的范式

> 设计数据库时，需要遵循的一些规范。要遵循后边的范式要求，必须先遵循前边的所有范式要求。
>
> 基本表及其字段之间的关系, 应尽量满足第三范式。
>
> 但是，满足第三范式的数据库设计，往往不是最好的设计。
>
> 为了提高数据库的运行效率，常常需要降低范式标准：适当增加冗余，达到以空间换时间的目的。 

在实际开发中最为常见的设计范式有三个：

* **1．第一范式(确保每列保持原子性)**

第一范式是最基本的范式。如果数据库表中的所有字段值都是不可分解的原子值，就说明该数据库表满足了第一范式。

第一范式的合理遵循需要根据系统的实际需求来定。比如某些数据库系统中需要用到“地址”这个属性，本来直接将“地址”属性设计成一个数据库表的字段就行。但是如果系统经常会访问“地址”属性中的“城市”部分，那么就非要将“地址”这个属性重新拆分为省份、城市、详细地址等多个部分进行存储，这样在对地址中某一部分操作的时候将非常方便。这样设计才算满足了数据库的第一范式，如下表所示。

![image.png](https://s2.loli.net/2022/01/10/5CGOguljTPL9yNa.png)

> 上表所示的用户信息遵循了第一范式的要求，这样在对用户使用城市进行分类的时候就非常方便，也提高了数据库的性能。         

* **2.第二范式(确保表中的每列都和主键相关)**

第二范式在第一范式的基础之上更进一层。第二范式需要确保数据库表中的每一列都和主键相关，而不能只与主键的某一部分相关（主要针对联合主键而言）。也就是说在一个数据库表中，一个表中只能保存一种数据，不可以把多种数据保存在同一张数据库表中。

比如要设计一个订单信息表，因为订单中可能会有多种商品，所以要将订单编号和商品编号作为数据库表的联合主键，如下表所示。

 **订单信息表**

![image.png](https://s2.loli.net/2022/01/10/3K8GPTnkord46fN.png)

这样就产生一个问题：这个表中是以订单编号和商品编号作为联合主键。这样在该表中商品名称、单位、商品价格等信息不与该表的主键相关，而仅仅是与商品编号相关。所以在这里违反了第二范式的设计原则。

而如果把这个订单信息表进行拆分，把商品信息分离到另一个表中，把订单项目表也分离到另一个表中，就非常完美了。如下所示。

![image.png](https://s2.loli.net/2022/01/10/vuPDezSLr3NtGVJ.png)

> 这样设计，在很大程度上减小了数据库的冗余。如果要获取订单的商品信息，使用商品编号到商品信息表中查询即可。

* **3．第三范式(确保每列都和主键列直接相关,而不是间接相关)**

第三范式需要确保数据表中的每一列数据都和主键直接相关，而不能间接相关。

比如在设计一个订单数据表的时候，可以将客户编号作为一个外键和订单表建立相应的关系。而不可以在订单表中添加关于客户其它信息（比如姓名、所属公司等）的字段。如下面这两个表所示的设计就是一个满足第三范式的数据库表。

![image.png](https://s2.loli.net/2022/01/10/aUGJMHxWmFfeQKc.png)

> 这样在查询订单信息的时候，就可以使用客户编号来引用客户信息表中的记录，也不必在订单信息表中多次输入客户信息的内容，减小了数据冗余。

#### 事务

##### 1.事务的基本介绍

> 如果一个包含多个步骤的业务操作，被事务管理，那么这些操作要么同时成功，要么同时失败。

* 操作：

   1.开启事务：start transaction;

   2.回滚：rollback;

   3.提交：commit;

* 例子：

  ```sql
  --建表
  CREATE TABLE account(
     id INT PRIMARY KEY AUTO_INCREMENT,
     NAME VARCHAR(10),
     balance DOUBLE
  );
  
  --插入数据
  INSERT INTO account(NAME,balance) VALUES ('zhangsan',1000),('lisi',1000);
  
  SELECT * FROM account;
  
  -- 张三给李四转账500元
  -- 0.开启事务
  START TRANSACTION;
  -- 1.张三账户 -500
  UPDATE account SET balance = balance - 500 WHERE NAME = 'zhangsan';
  -- 2.李四账户 + 500
  UPDATE account SET balance = balance + 500 WHERE NAME = 'lisi';
  
  -- 出错了/没出错...
  
  -- 发现没有问题了，提交事务
  COMMIT;
  -- 发现出问题了，回滚事务
  ROLLBACK;
  ```

* MySQL数据库中事务默认自动提交，事务提交的两种方式：

  * 自动提交：

    > mysql就是自动提交的
    >
    > 例如：一条DML（增删改）语句会自动提交一次事务。

  * 手动提交：

    > 需要先开启事务，再提交
    >
    > Oracle数据库默认是手动提交事务



* 修改事务的默认提交方式：

  ```
  --查看事务的默认提交方式：
  SELECT @@autocommit; -- 1 代表自动提交  0 代表手动提交
  
  --修改默认提交方式：
  SET @@autocommit = 0;   
  ```

##### 2.事务的四大特征ACID

* 原子性（Atomicity）

  > 原子性是指事务包含的所有操作要么全部成功，要么全部失败回滚。

* 一致性（Consistency）

  > 一致性是指事务必须使数据库从一个一致性状态变换到另一个一致性状态，也就是说一个事务执行之前和执行之后都必须处于一致性状态。
  >
  > 拿转账来说，假设用户A和用户B两者的钱加起来一共是5000，那么不管A和B之间如何转账，转几次账，事务结束后两个用户的钱相加起来应该还得是5000，这就是事务的一致性。

* 隔离性（Isolation）

  > 隔离性是当多个用户并发访问数据库时，比如操作同一张表时，数据库为每一个用户开启的事务，不能被其他事务的操作所干扰，多个并发事务之间要相互隔离。
  >
  > 即要达到这么一种效果：对于任意两个并发的事务T1和T2，在事务T1看来，T2要么在T1开始之前就已经结束，要么在T1结束之后才开始，这样每个事务都感觉不到有其他事务在并发地执行。

* 持久性（Durability）

  > 持久性是指一个事务一旦被提交了，那么对数据库中的数据的改变就是永久性的，即便是在数据库系统遇到故障的情况下也不会丢失提交事务的操作。
  >
  > 例如我们在使用JDBC操作数据库时，在提交事务方法后，提示用户事务操作完成，当我们程序执行完成直到看到提示后，就可以认定事务以及正确提交，即使这时候数据库出现了问题，也必须要将我们的事务完全执行完成，否则就会造成我们看到提示事务处理完毕，但是数据库因为故障而没有执行事务的重大错误。

##### 3.事务的隔离级别（了解）

> 多个事务之间隔离的，相互独立的。但是如果多个事务操作同一批数据，则会引发一些问题，设置不同的隔离级别就可以解决这些问题。

**隔离级别：**

* Serializable (串行化)：可避免脏读、不可重复读、幻读的发生。

* Repeatable read (可重复读)（默认）：可避免脏读、不可重复读的发生。

* Read committed (读已提交)：可避免脏读的发生。

* Read uncommitted (读未提交)：最低级别，任何情况都无法保证。

  > 注意：隔离级别从低到高到安全性越来越高，但是效率越来越低
  >
  > 查询数据库隔离级别：
  >
  > select @@tx_isolation;
  >
  > 数据库设置隔离级别：
  >
  > set global transaction isolation level 级别字符串;

**存在问题：**

* 1.脏读

  > 脏读是指在一个事务处理过程里读取了另一个未提交的事务中的数据。

  　　当一个事务正在多次修改某个数据，而在这个事务中这多次的修改都还未提交，这时一个并发的事务来访问该数据，就会造成两个事务得到的数据不一致。例如：用户A向用户B转账100元，对应SQL命令如下

  ```
  update account set money=money + 100 where name=’B’;  (此时A通知B)
  update account set money=money - 100 where name=’A’;
  ```

  　　当只执行第一条SQL时，A通知B查看账户，B发现确实钱已到账（此时即发生了脏读），而之后无论第二条SQL是否执行，只要该事务不提交，则所有操作都将回滚，那么当B以后再次查看账户时就会发现钱其实并没有转。

* 2.不可重复读

  > 不可重复读是指在对于数据库中的某个数据，一个事务范围内多次查询却返回了不同的数据值，这是由于在查询间隔，被另一个事务修改并提交了。

  　　例如事务T1在读取某一数据，而事务T2立马修改了这个数据并且提交事务给数据库，事务T1再次读取该数据就得到了不同的结果，发生了不可重复读。

  　　不可重复读和脏读的区别是，脏读是某一事务读取了另一个事务未提交的脏数据，而不可重复读则是读取了前一事务提交的数据。

  　　在某些情况下，不可重复读并不是问题，比如我们多次查询某个数据当然以最后查询得到的结果为主。但在另一些情况下就有可能发生问题，例如对于同一个数据A和B依次查询就可能不同，A和B就可能打起来了……

* 3.虚读(幻读)

  > 幻读是事务非独立执行时发生的一种现象。例如事务T1对一个表中所有的行的某个数据项做了从“1”修改为“2”的操作，这时事务T2又对这个表中插入了一行数据项，而这个数据项的数值还是为“1”并且提交给数据库。而操作事务T1的用户如果再查看刚刚修改的数据，会发现还有一行没有修改，其实这行是从事务T2中添加的，就好像产生幻觉一样，这就是发生了幻读。

  　　幻读和不可重复读都是读取了另一条已经提交的事务（这点就脏读不同），所不同的是不可重复读查询的都是同一个数据项，而幻读针对的是一批数据整体（比如数据的个数）。

#### 视图

##### 1.什么是视图？

视图是基于 SQL 语句的结果集的可视化的表，即视图是一个虚拟存在的表，可以包含表的全部或者部分记录，也可以由一个表或者多个表来创建。使用视图就可以不用看到数据表中的所有数据，而是只想得到所需的数据。当我们创建一个视图的时候，实际上是在数据库里执行了SELECT语句，SELECT语句包含了字段名称、函数、运算符，来给用户显示数据。使用视图查询可以使查询数据相对安全，通过视图可以隐藏一些敏感字段和数据，从而只对用户暴露安全数据。视图查询也更简单高效，如果某个查询结果出现的非常频繁或经常拿这个查询结果来做子查询，将查询定义成视图可以使查询更加便捷。

##### 2.视图创建及使用方法

* 完整创建语法：

    ```
    CREATE
        [OR REPLACE]
        [ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
        [DEFINER = user]
        [SQL SECURITY { DEFINER | INVOKER }]
        VIEW view_name [(column_list)]
        AS select_statement
        [WITH [CASCADED | LOCAL] CHECK OPTION]
    ```

    > 语法解读（了解）：
    >
    > 1）OR REPLACE：表示替换已有视图，如果该视图不存在，则CREATE OR REPLACE VIEW与CREATE VIEW相同。
    >
    > 2）ALGORITHM：表示视图选择算法，默认算法是UNDEFINED(未定义的)：MySQL自动选择要使用的算法 ；merge合并；temptable临时表，一般该参数不显式指定。
    >
    > 3）DEFINER：指出谁是视图的创建者或定义者，如果不指定该选项，则创建视图的用户就是定义者。
    >
    > 4）SQL SECURITY：SQL安全性，默认为DEFINER。
    >
    > 5）select_statement：表示select语句，可以从基表或其他视图中进行选择。
    >
    > 6）WITH CHECK OPTION：表示视图在更新时保证约束，默认是CASCADED。

* 一般用法：

    ```
    CREATE VIEW 视图名 AS SELECT 查询语句;
    ```

* 修改视图

    ```
    ALTER VIEW 视图名 AS SELECT 查询语句;
    ```

* 删除视图

    ```
    DROP VIEW 视图名;
    ```

##### 3.注意事项

> 要通过视图更新基本表数据，必须保证视图是可更新视图，即可以在INSET、UPDATE或DELETE等语句当中使用它们。对于可更新的视图，在视图中的行和基表中的行之间必须具有一对一的关系。还有一些特定的其他结构，这类结构会使得视图不可更新。
>
> 一般情况下不建议对视图做DML操作

如果视图包含下述结构中的任何一种，那么它就是不可更新的：

* LIMIT关键字；

* 聚合函数；
* DISTINCT关键字；
* GROUP BY子句；
* ORDER BY子句；
* HAVING子句；
* UNION运算符；
* 位于选择列表中的子查询；
* FROM子句中包含多个表；
* SELECT语句中引用了不可更新视图；
* WHERE子句中的子查询，引用FROM子句中的表；
* ALGORITHM 选项指定为TEMPTABLE（使用临时表总会使视图成为不可更新的）

##### 4.为什么使用视图

* 简单：使用视图的用户完全不需要关心后面对应的表的结构、关联条件和筛选条件，对用户来说已经是过滤好的复合条件的结果集。

* 安全：使用视图的用户只能访问他们被允许查询的结果集，对表的权限管理并不能限制到某个行某个列，但是通过视图就可以简单的实现。

* 数据独立：一旦视图的结构确定了，可以屏蔽表结构变化对用户的影响，源表增加列对视图没有影响；源表修改列名，则可以通过修改视图来解决，不会造成对访问者的影响。

总而言之，使用视图的大部分情况是为了保障数据安全性，提高查询效率。比如说我们经常用到几个表的关联结果，那么我们就可以使用视图来处理，或者说第三方程序需要调用我们的业务库，可以按需创建视图给第三方程序查询

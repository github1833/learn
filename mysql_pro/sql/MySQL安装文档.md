# MySQL安装文档

#### 准备工作

* 关闭防火墙

  ```
  # 停止firewall
  systemctl stop firewalld.service
  
  # 禁止firewall开机启动
  systemctl disable firewalld.service
  
  # 查看防火墙状态
  systemctl status firewalld.service
  ```

* 修改主机名

  ```
  hostnamectl set-hostname master
  # 重新连接即可生效
  # 查看主机名
  hostname
  ```

* 配置静态IP

  ```
  # 停止NetworkManager服务
  systemctl stop NetworkManager
  # 取消NetworkManager服务开机自启
  systemctl disable NetworkManager
  
  # 修改配置文件，配置静态IP
  cd /etc/sysconfig/network-scripts
  vim ifcfg-ens33
  
  # 以下配置仅供参考！！！需要根据自己的实际情况配置
  TYPE=Ethernet
  BOOTPROTO=static
  DEFROUTE=yes
  NAME=ens33
  DEVICE=ens33
  ONBOOT=yes
  IPADDR=192.168.190.100
  NETMASK=255.255.255.0
  GATEWAY=192.168.190.2
  DNS1=192.168.190.2
  
  # 重启网络服务
  systemctl restart network
  ```

* 配置hosts IP 主机名映射关系

  ```
  vim /etc/hosts
  ```

#### 安装mysql5.7

* 下载yum Repository

  > 如果没有wget命令，则可以使用```yum install wget```

  ```
  wget -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
  ```

* 安装yum Repository

  ```
  yum -y install mysql57-community-release-el7-10.noarch.rpm
  ```

* 使用yum安装mysql5.7

  ```
  yum -y --nogpgcheck install mysql-community-server
  ```

* 卸载yum Repository

  ```
  # 因为安装了Yum Repository，以后每次yum操作都会自动更新，需要把这个卸载掉
  yum -y remove mysql57-community-release-el7-10.noarch
  ```

#### 启动并配置MySQL

* 启动MySQL

  ```
  systemctl start mysqld
  ```

* 配置MySQL开机自启

  ```
  systemctl enable mysqld.service
  ```

* 查看状态

  ```
  systemctl status mysqld.service
  ```

* 获取临时密码

  ```
  grep "password" /var/log/mysqld.log
  ```

* 登录MySQL

  ```
  # 回车并输入密码，注意不要手敲密码，直接复制粘贴
  mysql -u root -p
  ```

* 关闭密码复杂验证

  ```
  set global validate_password_policy=0;
  set global validate_password_length=1;
  ```

* 设置密码

  ```
  alter user user() identified by "123456";
  ```

* 开放root用户远程登录

  ```
  # 切换数据库
  use mysql;
  # 修改权限
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
  # 刷新权限
  flush privileges; 
  # 退出
  exit;
  ```

#### 修改MySQL编码

* 编辑配置文件：```vim /etc/my.cnf```

  ```
  [client]
  default-character-set = utf8mb4
  [mysqld]
  character-set-server = utf8mb4
  collation-server = utf8mb4_general_ci
  ```

* 重启MySQL

  ```
  systemctl restart mysqld
  ```

* 登录并查看MySQL编码

  ```
  # 123456需替换为自己的密码
  mysql -uroot -p123456
  
  # 需在MySQL的shell中执行
  show variables like "%char%";
  ```

#### 卸载MySQL

* 删除依赖包

  ```
  # 查找mysql相关的安装包
  rpm -qa |grep -i mysql
  # 对mysql相关的包进行移除
  yum remove mysql-community mysql-community-server mysql-community-libs mysql-community-common
  ```

* 清理文件

  ```
  find / -name mysql
  rm -rf 文件名
  ```

  
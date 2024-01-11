# 以读取模式打开文件
with open('123.txt', mode='r') as file:
    # 读取文件内容到字符串中
    file_content = file.read()

# 打印字符串内容
print(file_content.encode())
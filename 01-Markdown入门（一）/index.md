# Markdown入门(一)  
## 00 &nbsp; Markdown  
Markdown是一种轻量级标记语言，创始人为约翰·格鲁伯（英语：John Gruber）。 它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML（或者HTML）文档。这种语言吸收了很多在电子邮件中已有的纯文本标记的特性。

## 01 &nbsp; 环境  
例如[vscode](https://code.visualstudio.com/)、[Typora](https://www.typora.io/)、[Draft](https://draftin.com/)、Byword等，这里不进行比较，直接推荐使用vscode，因为写前端代码用vscode很多，所以开始就选择了vscode。   

vscode安装Markdown Preview Enhanced插件启用，新建一个Markdown文件，后缀 .md,之后就可以写笔记了。   

## 02 &nbsp; 基本语法  
#### 标题  
使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推。
```markdown 
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
preview 
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
---------------------------

#### 字体   
```markdown  
*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___
```
preview  
*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___


#### 代码    
![adfa][link1]  
preview
```JavaScript  
$(document).ready(function () {
    alert('AnnGreen');
});  
```

#### 链接       
```markdown 
[AnnGreen的简书主页](https://www.jianshu.com/u/3677ca70057e)
```
preview  
[AnnGreen的简书主页](https://www.jianshu.com/u/3677ca70057e)

#### 空格  
```markdown 
手动输入空格 （&nbsp;）。注意！此时的分号为英文分号   

使用全角空格。即：在全角输入状态下直接使用空格键
```

#### 图片  
1、使用url或者某个本机路径(缺点：路径出问题就不行了)
```markdown 
![alt 属性文本](图片地址)

![alt 属性文本](图片地址 "可选标题")   
```
例子
```markdown
![我的头像](https://upload.jianshu.io/users/upload_avatars/26478343/ae5b2fc7-e4c8-4f1d-a945-be197fec1d43.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/300/format/webp)
```
效果
![我的头像](https://img-blog.csdnimg.cn/img_convert/5f6bd0a9425fc34066c0ad2138df1bc3.png)   
2、使用base64编码内嵌到md文档中   
使用工具([OKtools](https://oktools.net/image2base64)、[工具123](http://www.gjw123.com/tools-ImageToBase64)或者其他都行)把图片转成base64编码   
```markdown  
![属性文本](变量名)  
```
然后再文档底部写清变量名对应的base64编码值  
```markdown 
[变量名]:base64编码值
```
例子就不写了，一个图片的base64的编码值太长了
## 03 &nbsp; 导出     
vscode中安装了插件的话，直接再右侧预览页面右键，可以导出为html、pdf等，自由选择。  

## 04 &nbsp; 一些有用的参考 
[markdown中文指南](https://www.markdown.xyz/basic-syntax/)















[link1]:https://img-blog.csdnimg.cn/2022010615512475348.png
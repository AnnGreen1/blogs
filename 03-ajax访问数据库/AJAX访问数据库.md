#AJAX访问数据库
`AJAX`（Asynchronous JavaScript and XML，异步的 JavaScript 和 XML）可以在不重新加载整个页面的情况下与服务器交换数据并更新网页内容。之前学的时候没怎看，现在刚好能用到，所以又是一个黑暗中瞎摸索的过程:(
####XMLHttpRequest对象
`XMLHttpRequest` 对象是`AJAX`的基础，通过它就可以在后台与服务器交换数据，能够让我们在不重新加载整个网页的情况下，对网页局部进行更新，且目前几乎所有的浏览器都支持（除了IE5 和 IE6，它们 使用 `ActiveXObject`）。我们可以直接使用`XMLHttpRequest` 对象来完成请求操作。

1、创建XMLHttpRequest对象
```javascript{.line-numbers}
var xhr = new XMLHttpRequest();
```
不过，为了应对所有的现代浏览器，包括 IE5 和 IE6，在创建 `XMLHttpRequest` 对象时最好检查浏览器是否支持。如果支持，则创建 `XMLHttpRequest` 对象。如果不支持，则创建 `ActiveXObject` ：
```javascript{.line-numbers}
var xhr;
if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
}
else{
    // code for IE6, IE5
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```

2、发送请求
向服务器发送请求，我们可以使用XMLHttpRequest对象的 open( ) 以及 send( ) 方法。
```javascript{.line-numbers}
/*
规定请求的类型、URL以及是否异步处理请求
method:请求的类型、URL以及是否异步处理请求
url:文件在服务器上的位置
async:true(异步)或false(同步)
*/
open(method,url,async)
/*
将请求发送到服务器
string:仅用于POST请求
*/
send(string)
```
3、获取服务器响应

我们可以通过 XMLHttpRequest 对象的 responseText 或 responseXML 属性来获取服务器响应信息
```javascript{.line-numbers}
/*
responseText 获取字符串形式的响应数据

responseXML 获取XML形式的响应数据
*/
```
4、执行 onreadystatechange 事件

请求被发送到服务器过程中，readyState 属性会保存 XMLHttpRequest 的状态信息，当 readyState 改变时，就会触发 onreadystatechange 事件。因此我们可以根据通过该事件来执行一些基于响应的任务
```html{.line-numbers}
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>jQuery AJAX</title>
    <style>
        #content {
            color: black;
            background-color: powderblue;
            width: 800px;
            height: 200px;
        }
    </style>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(
            function() {
                $("#requestBtn").click(
                    function() {
                        // 1、创建XMLHttpRequest请求对象
                        var xhr;
                        if (window.XMLHttpRequest) {
                            xhr = new XMLHttpRequest();
                        } else {
                            xhr = new ActiveXObject("Microsoft.XMLHTTP");
                        }

                        // 2、创建请求路径
                        var urlStr = "http://wthrcdn.etouch.cn/weather_mini?city=芜湖";

                        //设置请求对象的准备状态
                        xhr.onreadystatechange = function() {
                            // 准备状态为已完成，且请求状态为OK时
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                //将请求返回的数据展示在页面中
                                $("#content").html(xhr.responseText);
                            }
                        };
                        // 3、发起请求
                        xhr.open("GET", urlStr, true);
                        xhr.send();
                    }
                );
            }
        );
    </script>
</head>

<body>
    <p>今天的天气怎样？</p>
    <button id="requestBtn">请求天气信息</button>
    <p></p>
    <div id="content"></div>
</body>

</html>
```

####jQuery 与 AJAX
jQuery 中针对 AJax 封装了几个比较实用的方法

通过http请求从服务器请求数据
```javascript{.line-numbers}

/*
URL：必需、规定的URL
data：可选、规定连同请求发送到到服务器的数据

function(data,status,xhr)：可选。规定当请求成功时运行的函数。
                        额外的参数：
                        data - 包含来自请求的结果数据
                        status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
                        xhr - 包含 XMLHttpRequest 对象

dataType：可选。规定预期的服务器响应的数据类型。
                        默认地，jQuery 会智能判断。
                        可能的类型：
                        "xml" - 一个 XML 文档
                        "html" - HTML 作为纯文本
                        "text" - 纯文本字符串
                        "script" - 以 JavaScript 运行响应，并以纯文本返回
                        "json" - 以 JSON 运行响应，并以 JavaScript 对象返回
                        "jsonp" - 使用 JSONP 加载一个 JSON 块，将添加一个 "?callback=?" 到 URL 来规定回调
*/

$.get(URL, data, function(data, status, xhr), dataType)

$.post(URL, data, function(data, status, xhr), dataType)
```
该方法可以从服务器加载数据，可以把返回的数据直接放入被选取的元素中。
```javascript{.line-numbers}
/*
url     必需。规定您需要加载的 URL。
data    可选。规定连同请求发送到服务器的数据。
function(response,status,xhr)   可选。规定 load() 方法完成时运行的回调函数。
额外的参数：
response - 包含来自请求的结果数据
status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
xhr - 包含 XMLHttpRequest 对象
*/

$(selector).load(url, data, function(response, status, xhr))

```

####例子
```php{.line-numbers}
<!--    AjaxViewTest.php    -->
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>jQuery AJAX</title>
  <style>
    #content {
      color: black;
      background-color: powderblue;
      width: 800px;
      height: 200px;
    }
  </style>
  <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.6.0.min.js"></script>
  <script>

    var urlStr = "http://localhost/allPHPcode/test/AjaxServerTest.php?id=4";

    var data=$.get
    (
      urlStr,
      function w()
      {
        $('div').html(data.responseText);
      }
    );
              
  </script>
</head>

<body>
  <div id="content"></div>
</body>

</html>
```

```php{.line-numbers}
<?php
// AjaxServerTest.php


$id = $_GET['id'];


// 1, 连接数据库服务器
$host = "localhost";
$user = "root";
$password = "";
$database = "test";
$conn = mysqli_connect($host, $user, $password);
if (!$conn) 
{
    die("数据库连接失败!" . mysqli_connect_error());
}

#选择数据库
mysqli_select_db($conn, $database);

#执行sql语句
$result = mysqli_query($conn, "select * from testform where id='$id'");

if (mysqli_num_rows($result) > 0) 
{
    $response = [];
    // 通过 while 循环来遍历结果集，去除其中的数据
    while ($row = mysqli_fetch_array($result)) 
    {
        $contact = array
        (
            "id" => $row["id"],
            "username" => $row["username"],
            "password" => $row["password"],

        );
        array_push($response, $contact);
    }
    echo "<pre>";
    print_r($response);
    return $response;
    print_r(mysqli_fetch_assoc($result));
}


#关闭结果集
mysqli_free_result($result);
#断开与mysql数据库服务器的连接
mysqli_close($conn);
```
####使用请求过来的值
```javascript
//把请求过来的值放到标签里
$('#id').text(res.id);
$('#username').text(res.username);
$('#password').text(res.password);

//把请求过来的值放到input里
$('#id_input').val(res.id);
$('#username_input').val(res.username);
$('#password_input').val(res.password);
```
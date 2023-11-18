#PHPMailer实现简单邮箱验证码
####00PHPMailer
[PHPMailer](https://github.com/PHPMailer/PHPMailer/)是一个非常强大的 php发送邮件类,可以设定发送邮件地址、回复地址、邮件主题、html网页,上传附件,并且使用起来非常方便。

phpMailer 的特点：

1、在邮件中包含多个 TO、CC、BCC 和 REPLY-TO。
2、平台应用广泛，支持的 SMTP 服务器包括 Sendmail、qmail、Postfix、Gmail、Imail、Exchange 等等。
3、支持嵌入图像，附件，HTML 邮件。
4、可靠的强大的调试功能。
5、支持 SMTP 认证。
6、自定义邮件头。
7、支持 8bit、base64、binary 和 quoted-printable 编码。

####01准备
#####phpmailer 安装或者下载方式:

1、从 github 上下载: https://github.com/PHPMailer/PHPMailer/

2、使用 composer 安装:
```php
composer require phpmailer/phpmailer
```
我直接从github下载了.zip
#####邮箱配置
以qq邮箱为例，进入qq邮箱，依次找到首页-->账户-->`POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV`服务，开启前两个服务，要记录对应的授权码，这个邮箱就是用来发送验证码的邮箱（发件人）。

####02发送邮件
```php
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//根据自己的路径引入
require './PHPMailer-master/PHPMailer-master/src/Exception.php';
require './PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require './PHPMailer-master/PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //服务器配置
    $mail->CharSet ="UTF-8";                     //设定邮件编码
    $mail->SMTPDebug = 0;                        // 调试模式输出
    $mail->isSMTP();                             // 使用SMTP
    $mail->Host = 'smtp.qq.com';                // SMTP服务器
    $mail->SMTPAuth = true;                      // 允许 SMTP 认证
    $mail->Username = 'anngreen@qq.com';                // SMTP 用户名  即邮箱的用户名
    $mail->Password = 'atywqmmdmqcfdggf';             // SMTP 密码  部分邮箱是授权码(例如163邮箱)
    $mail->SMTPSecure = 'tls';                    // 允许 TLS 或者ssl协议
    $mail->Port = 587;                            // 服务器端口 25 或者465 具体要看邮箱服务器支持

    $mail->setFrom('anngreen@qq.com', 'Mailer');  //发件人
    $mail->addAddress('807487176@qq.com', 'Joe');  // 收件人
    //$mail->addAddress('ellen@example.com');  // 可添加多个收件人
    $mail->addReplyTo('anngreen@qq.com', 'info'); //回复的时候回复给哪个邮箱 建议和发件人一致
    //$mail->addCC('cc@example.com');                    //抄送
    //$mail->addBCC('bcc@example.com');                    //密送

    //发送附件
    // $mail->addAttachment('../xy.zip');         // 添加附件
    // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名

    //Content
    $mail->isHTML(true);                                  // 是否以HTML文档格式发送  发送后客户端可直接显示对应HTML内容
    $mail->Subject = '这里是邮件标题' . time();
    $mail->Body    = '<h1>这里是邮件内容</h1>' . date('Y-m-d H:i:s');
    $mail->AltBody = '如果邮件客户端不支持HTML则显示此内容';

    $mail->send();
    echo '邮件发送成功';
} catch (Exception $e) {
    echo '邮件发送失败: ', $mail->ErrorInfo;
}
```
####03实现简单的邮箱验证码注册
思路
1、注册的过程就是输入邮箱、密码，之后获取验证码，之后注册
2、要保证验证码在一定的时间内有效（要给验证码一个时间戳，以下代码并未实现，但是验证码的时间戳已经有了）
3、还要记住验证码是发给谁的，必需是对应的验证码才能注册成功
4、验证码先简单使用六位随机数
5、注册是向用户表插入数据，以下代码并未实现，只要在验证码验证成功的条件里写上插入操作就可以了
```html
<!--register.php-->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>注册</title>
</head>

<body>
    <div>
        <form action="../server/server_register.php" method="get">
            邮 箱<input type="email" name="email" id="email">

            密 码<input type="password" name="password" id="password"></br>
            验证码<input type="text" name="verificationcode" id="verificationcode"></br>

            <button>立刻注册</button>
        </form>
        <button onclick="getVerificationCode()">获取验证码</button>
    </div>

    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.6.0.min.js"></script>
    <script>
        function getVerificationCode() 
        {
            Email = $('#email').val();
            //console.log(Email);
            $.ajax({
                url: "http://localhost/allPHPcode/phpmailer/emailVerificationCode/server/createVerificationCode.php",
                type: 'get',
                data: { email:Email},
                success: function() {
                    alert("获取验证码成功！");
                }
            })
        }
    </script>
</body>

</html>
```

```
<?php
//  createVerificationCode.php



require './DB.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require '../../PHPMailer-master/PHPMailer-master/src/Exception.php';
require '../../PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require '../../PHPMailer-master/PHPMailer-master/src/SMTP.php';


$email = $_GET['email'];
// echo $email;
$time = time() + 8 * 3600;
$verficationCode = rand(100000, 999999);

$sql = "insert into emailverificationCode(id, username, verificationCode, createtime) values ('null', '$email', '$verficationCode' ,'$time')";
//echo $sql;
$count = DB::getInstance()->connect()->exec($sql);

function sendmail($email,$verficationCode)
{
    
$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //服务器配置
    $mail->CharSet ="UTF-8";                     //设定邮件编码
    $mail->SMTPDebug = 0;                        // 调试模式输出
    $mail->isSMTP();                             // 使用SMTP
    $mail->Host = 'smtp.qq.com';                // SMTP服务器
    $mail->SMTPAuth = true;                      // 允许 SMTP 认证
    $mail->Username = 'anngreen@qq.com';                // SMTP 用户名  即邮箱的用户名
    $mail->Password = 'atywqmmdmqcfdggf';             // SMTP 密码  部分邮箱是授权码(例如163邮箱)
    $mail->SMTPSecure = 'tls';                    // 允许 TLS 或者ssl协议
    $mail->Port = 587;                            // 服务器端口 25 或者465 具体要看邮箱服务器支持

    $mail->setFrom('anngreen@qq.com', 'Mailer');  //发件人
    $mail->addAddress($email, 'Joe');  // 收件人
    //$mail->addAddress('ellen@example.com');  // 可添加多个收件人
    $mail->addReplyTo('anngreen@qq.com', 'info'); //回复的时候回复给哪个邮箱 建议和发件人一致
    //$mail->addCC('cc@example.com');                    //抄送
    //$mail->addBCC('bcc@example.com');                    //密送

    //发送附件
    // $mail->addAttachment('../xy.zip');         // 添加附件
    // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名

    //Content
    $mail->isHTML(true);                                  // 是否以HTML文档格式发送  发送后客户端可直接显示对应HTML内容
    $mail->Subject = '这里是邮件标题' . time();
    $mail->Body    = '<h1>验证码是</h1>' . $verficationCode."<br>" .date('Y-m-d H:i:s');
    $mail->AltBody = '如果邮件客户端不支持HTML则显示此内容';

    $mail->send();
    echo '邮件发送成功';
} catch (Exception $e) {
    echo '邮件发送失败: ', $mail->ErrorInfo;
}
}


if ($count > 0) {
    sendmail($email,$verficationCode);
    echo "<script>alert('获取成功！');</script>";
    //echo "<script>alert('添加成功！');</script>";
} else {
    echo "<script>alert('获取失败！');</script>";
}

```

```php
<?php
//server_register.php

require 'DB.php';
$email = $_REQUEST['email'];
$password = $_REQUEST['password'];
$verificationcode = $_REQUEST['verificationcode'];

$sqlselectverificationcode = "select * from emailverificationCode where username = '$email' and $verificationcode = '$verificationcode'";
$stmt = DB::getInstance()->connect()->query($sqlselectverificationcode);
if(is_null($stmt)) 
{
    echo "<script>alert('注册成功！');</script>";
}else{
    echo "<script>alert('注册失败！');</script>";
}

```

```php
<?php
//DB.php
/*
 * @Description: 数据库连接类
 */

class DB
{
  // 定义私有的单例对象
  static private $_instance;
  // 定义私有的连接对象
  private $_pdo;
  // 定义私有的配置信息对象
  private $config = [
    'dsn' => 'mysql:host=localhost;dbname=test;port=3306;charset=utf8',
    'username' => 'root',
    'password' => '',
    'option' => [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // 默认是 ：PDO::ERRMODE_SILENT,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
  ];

  // 私有化构造函数
  private function __construct() {}

  /**
   * @description: 获取单例对象 $_instance
   * @param {*}
   * @return {*}
   * @Author: Humbert Cheung
   */
  static public function getInstance() {
    // 判断 $_instance 是否是DB类的实例，即判断 $_instance 是否不为空
    if(!self::$_instance instanceof self) {
      // 为空，则实例化
      self::$_instance = new self();
    }
    return self::$_instance;
  }
  public function connect() {
    // 判断 $_pdo 是否存在
    if(!$this->_pdo) {
      try {
        // 不存在则实例化
        $this->_pdo = new PDO($this->config['dsn'], $this->config['username'], $this->config['password'], $this->config['option']);
      } catch (PDOException $e) {
        die('数据库连接失败：' . $e->getMessage());
      }
    }
    return $this->_pdo;
  }
}
```
`test`数据库下`emailverficationcode`只有id(自增主键)、username、verificationCode、createtime
#零基础thinkPHP验证码刷新及验证
####01安装capacha库
命令安装  `think-capacha`
```php{.line-numbers}
composer require topthink/think-captcha=2.0.*
```
####02 写生成验证码的方法verify()
在`application`新建模块，模块下新建控制器，继承`Controller`控制器里写上生成验证码的方法，其他参数可以看一下手册，手册里写的很全面
```php{.line-numbers}
//命名空间、captcha、控制器别忘了写
namespace .....
use think\captcha\Captcha;
use think\Controller;


//生成验证码的方法
public function verify()
{
        $config =    [
        // 验证码字体大小
        'fontSize'    =>    30,
        // 验证码位数
        'length'      =>    4,
        // 关闭验证码杂点
        'useNoise'    =>    false,

        'useCurve'    =>    false
    ];
    $captcha = new Captcha($config);
    return $captcha->entry();
}
```
####03写检验验证码方法checkCode()
继续在控制器里添加检验验证码的方法
```php{.line-numbers}
public function checkcode()
{
    var_dump($_POST);
    if (!empty($_POST)) 
    {
        $vry = new \think\captcha\Captcha();
        if ($vry -> check($_POS['verifyCode') 
        {
            echo "验证码正确";
        }else{
            echo "验证码错误";
        }
    }
}
```
####04定义路由
```php{.line-numbers}
//路由到模板，必需是当前那个view目录下
//  模块名@模板名
Route::view('ver','index@index');
```
####05新建一个视图，例子
```html{.line-numbers}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div><img src="{:url('index/index/verify')}" onclick="validateReload()" height="50" width="200" id="validate"></div>
    <form action="{:url('index/index/checkcode')}" method="post">
        <input type="text" name="verifyCode">
        <button>立刻验证</button>
    </form>


    <script>
        //刷新验证码的方法
        function validateReload() 
        {
            validate = document.getElementById('validate');
            validate.src = "{:url('index/index/verify')}";
        }
    </script>

</body>

</html>
```
####06实现验证码点击刷新
```javascript{.line-numbers}
<script>
    //刷新验证码的方法
    function validateReload() 
    {
        validate = document.getElementById('validate';
        validate.src = "{:url('index/index/verify')}";
    }
</script>
```
####07总览
![thinkphp验证码代码](https://pcsdata.baidu.com/thumbnail/6898ce8a8l8f3af76a40592de16a9ed7?fid=3819928092-16051585-537264633894670&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-s2Yfoni%2F%2BJOH6ZHo7oHzZw440RU%3D&expires=2h&chkv=0&chkbd=0&chkpc=&dp-logid=9171627424435371482&dp-callid=0&time=1639299600&bus_no=26&size=c1600_u1600&quality=100&vuk=-&ft=video)
####08效果
![验证码演示](https://pcsdata.baidu.com/thumbnail/2c117ad1co11a527bed354eefcd58397?fid=3819928092-16051585-356821886355883&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-meYc1jnNa9UgxD%2BhsC91eMtF%2BIk%3D&expires=2h&chkv=0&chkbd=0&chkpc=&dp-logid=9171627424435371482&dp-callid=0&time=1639299600&bus_no=26&size=c1600_u1600&quality=100&vuk=-&ft=video)
8、结尾
刚开始写这个作业也是很蒙，什么都不懂，但这怎么能难倒基于google、baidu，面向stackoverflow、csdn的程序猿  :)
几个有用的参考，但不适合我这种啥都不会的渣渣，不够零基础，于是自己总结了一下
[参考一](https://blog.csdn.net/qthdsy/article/details/53304742?spm=1001.2101.3001.6650.10&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-10.highlightwordscore&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-10.highlightwordscore)
[参考二](https://blog.csdn.net/Qlong_dd/article/details/20376395?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link)

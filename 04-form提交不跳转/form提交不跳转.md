`form` 表单提交数据，往往会刷新页面，数据提交后会跳转到其他页面
如果不需要刷新页面时，可以通过`ifame`实现无刷新。
在`form`表单下定义一个`ifame`
将 `form` 的 `target` 属性指向 `iframe` 的 `name` 属性，这样就实现了不刷新页面的`form`提交。
```php{.line-numbers}
<form action="./radioformserver.php" target="frameName">
    <input type="radio" name="sel" id="" value="a">a
    <input type="radio" name="sel" id="" value="b">b
    <input type="radio" name="sel" id="" value="c">c
    <input type="radio" name="sel" id="" value="d">d
    <button>提交</button>
</form>
<iframe src="" frameborder="0" name="frameName"></iframe>
```

应用：在做选择题的时基本都有上一题和下一题，但是只想记录选择了哪个选项（提交）却不想跳转
[参考一](https://blog.csdn.net/weixin_42915204/article/details/82893837)
[参考二](https://blog.csdn.net/qq_42617840/article/details/88689411)
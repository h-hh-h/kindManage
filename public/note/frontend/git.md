## 版本控制系统、代码管理工具
+ 分布式

## 配置
+ name：
    + `git config --global user.name "xxx"`
+ email
    + `git config --global user.email "xxx"`

## 常用命令
+ `git status`
    + 查看当前仓库中文件状态
+ `git init`
    + 初始化
+ `git add <file>`
    + 未跟踪 => 暂存
+ `git commit`
    + 将暂存的文件提交到仓库，暂存 => 未修改
    + 参数
        + `-m "xxx"`
            + xxx是对提交的解释
        + `-a`
            + 提交所有已修改文件
+ `git log`
    + 查看提交的日志
+ `git resotre <file>`
    + 恢复重置文件
    + `--staged`
        + 取消暂存状态
+ `git rm <file>`
    + 删除文件
    + 如果文件已修改，会替换为restore
        + 添加`-f`，强制删除
+ `git mv <fromFile> <toFile>`
    + 移动文件
+ `git branch`
    + 查看当前分支
    + `<branchName>`
        + 创建新的分支
    + `-d <branchName>`
        + 删除分支
+ `git switch <branchName>`
    + 切换分支
    + `-c <branchName>`
        + 创建并切换分支

## 文件状态
+ 未跟踪
+ 已跟踪
    1. 暂存
        + 文件修改已保存，但尚未提交到git仓库
    2. 未修改
        + 表示磁盘中的文件和git仓库中文件相同，没有修改
    3. 已修改
        + 表示磁盘中文件已被修改，和git仓库中的不同
+ 一般流程
    + 新文件经过添加（暂存状态），再进行提交（未修改状态）
    + 修改文件（已修改状态）经过添加（暂存状态），再进行提交（未修改状态）

## 分支
+ 每一次提交都会创建一个与之对应的节点，通过节点来记录文件状态，构成一个树状结构。默认情况下仓库只有一个分支，名为master
+ 可以创建都各分支，分支与分支之间相互独立
+ 分支合并
    + `git merge <brachName>`
        + 快速合并（两个分支在同一条节点线上）
        + 将`<brachName>`与当前所在分支快速合并
        + 当合并时存在冲突可以选择保留其中之一或是全部保留
    + 变基（rebase）
        1. 寻找当前分支与目标分支最近的共同祖先
        2. 对比当前分支相对于祖先的历史提交，并将当前所处分支暂存在一个临时文件中
        3. 将当前分支指向目标分支的基底（最后一次提交记录）
        4. 以该基底开始，重复执行历史操作
        + 相当于合并，但可以使提交记录更加清晰。

## 远程仓库
+ 命令
    ```
    git remote add <repositoryName> <url>
    # 添加远程仓库

    git branch -M <branchName>
    # 重命名本地的当前分支

    git push -u <repositoryName> <branchName>
    # 将本地分支添加到远程仓库中
    # -u表示推送代码并和当前分支关联

    git push <repositoryName> <localBranch>:<remoteBranch>
    # 添加到远程库的其他分支

    git clone <url>
    # 从远程库拉源码
    ```
+ 多个库的同步问题
    + 要想推送成功，必须确保本地库与远程库的版本一致
    + `git push`
        + 如果本地的版本低于远程库，push默认会推送失败
    + `git fetch`
        + 会从远程仓库下载所有代码，但不会将代码进行合并，合并必须手动进行（先合并、处理冲突，再add、commit，最后push）
    + `git pull`
        + 从远程库拉取代码并自动合并

## 标签
+ 版本回溯
    + `git switch xxx`
        + xxx可以是每次提交记录的id（部分即可）
        + 问题：
            + 该操作会分离头指针（即头指针没有指向分支的头），此时操作代码不会出现在任何分支中
            + 可以创建新分支来避免该问题
+ `git tag <tagName> <部分id>`
    + 为提交记录设置标签，以此来达到快速到达某一分支的目的
    + 仍然存在分离头指针的问题
    + `git tag -d <tagName>`
        + 删除标签
    + `git push <repositoryName> <tagName>`
    + `git push --tags`
        + 提交全部tag
    + `git push <repositoryName> --delete <tagName>`
        + 删除远程标签

## gitignore
+ 直接在项目创建一个.gitignore文件，添加希望忽略的文件

## gh-pages
+ 可以将静态页面部署到GitHub上
    + 静态页面的分支名必须为`gh-pages`
    + 如果希望页面可以通过`xxx.github.io`访问，就将库名命名为`xxx.github.io`

## Docusaurus[docusaurus.io]
+ 快速搭建静态网站
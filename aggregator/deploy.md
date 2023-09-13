### [部署说明](#)
`期待后端地址为`:`http://ip:17001`  
`前端运行端口号`:`10008`

`打包前端项目`
```shell
npm run build
```

`生产一个镜像`:`名字为 transaction-end`
```shell
docker build -f Dockerfile -t aggregator-end .
```
保存本地docker文件
```shell
docker save -o aggregator-end.tar   aggregator-end 
```

```shell
docker load -i aggregator-end.tar
```

`运行镜像`
```shell
docker run -d -p 10008:10008 aggregator-end 
```
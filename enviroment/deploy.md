### [部署说明](#)
`期待后端地址为`:`http://127.0.0.1:17002`  
`前端运行端口号`:`10086`

`打包前端项目`
```shell
npm run build
```

`生产一个镜像`:`名字为 transaction-end`
```shell
docker build -f Dockerfile -t transaction-end .
```

```shell
docker save -o transaction-end.tar   transaction-end  

docker load -i transaction-end.tar
```

`运行镜像`
```shell
docker run -d -p 10086:10086 transaction-end
```
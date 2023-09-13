### [部署说明](#)



`生产一个镜像`:`名字为 floor-end-0x`
```shell
docker build -f Dockerfile -t floor-end-01 .
docker build -f Dockerfile -t floor-end-02 .
```

```shell
docker save -o floor-end-01.tar   floor-end-01
docker save -o floor-end-02.tar   floor-end-02
```

`运行镜像`
```shell
docker load -i floor-end-01.tar   
docker load -i floor-end-02.tar

docker run -d -p 18888:18888 floor-end-01
docker run -d -p 18889:18889 floor-end-02
```
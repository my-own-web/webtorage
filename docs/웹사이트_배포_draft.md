# 웹사이트 배포하기 (draft)

투두 리스트를 배포한 방법을 기록했다. 도커를 사용해 배포하는 법도 추가 예정이다.

(chk)로 표시된 문장은 확인이 필요하다.

> **목차**
> 
> 1. [aws ec2 인스턴스 생성](#1-aws-ec2-인스턴스-생성)
> 
> 2. [프론트엔드 배포: react 빌드, nginx 세팅](#2-프론트엔드-배포)
> 
> 3. [백엔드 배포: express 환경 세팅](#3-백엔드-배포)

## 1. aws ec2 인스턴스 생성

인스턴스 시작 - Ubuntu Server 18.04 LTS ... - 인스턴스 유형 선택(프리티어) 

보안 그룹: 

기본 SSH 포트 22는 열려져 있다.

그 외로 다음 포트를 열었다.

1. http 통신을 할 포트 80

2. 백엔드와 연결할 포트 3001 (chk)

보안-인바운드 규칙에서 소스는 http빼고 모두 내IP로 설정해놨다. 

> --> 이게 보안에 어떻게 도움 될까? (chk)

> (chk) TCP 프로티콜이란?

RSA 키 페어를 등록한다.

기존 키 페어는 전 인스턴스에 사용했던 키 페어를 뜻한다.  나는 내가 가지고 있는 다른 키 페어를 뜻하는 줄 알았지만...

> 참고: [키 페어를 잃어버린 인스턴스 접속 방법](https://velog.io/@brighten_the_way/AWS-EC2-key-pair-loss)

키 페어가 없어서 `ssh-keygen`을 통해 생성했다. 

하지만 이걸 사용하진 않고, aws에서 새로운 키를 생성했다.

`.pub`: 공개키

`.pem`:  개인키. **절대 공유 금지**. 나는 뒤 확장자가 생략되어 나왔다.

퍼블릭 IPv4 주소가 주소창에 치는 주소다.

퍼블릭 IPv4 DNS는 서버에 접속할 때 사용하는 주소다.

cmd에서 `ssh -i "[개인키PATH]" ubuntu@[주소]`로 서버에 들어갔다.

> (chk) ubuntu는 여러개 ami?aml 중 하나인데, ami/aml이 무엇인가?

## 2. 프론트엔드 배포

### React 개발/배포 모드 분리

utils/axios.js

```javascript
import axios from "axios";

export const TodoApi = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "/api"
});
```

server.js

```javascript
app.post('/api/todos', async (req, res) => {});
```

baseURL을 모드 따라 분리했다. 개발 모드에서 localhost는 내 주소이지만, 배포 모드에서는 사용자 주소이기 때문이다.

개발모드이면 원래 로컬 포트/api, 그 외 모드이면 /api. /api는 백엔드 관용적 경로인 것 같다.

> (chk) 왜 그렇게 사용할까?
> 
> Node_ENV는 또 뭐지...?

### React 빌드

`npm run build`로 빌드한 폴더를 서버에 옮긴다. `scp` 명령어를 사용했다.

`scp [파일] ubuntu@[주소]:/home/ubuntu` 형식이다. 

폴더를 이동시킬 때는 `-r`(디렉토리 및 하위 모든 파일 복사)를 추가한다.

> 참고: [[리눅스] scp 명령어 사용법, 이 글 하나면 충분해](https://lifegoesonme.tistory.com/459)
> 
> ubuntu -> 윈도우 이동시: 윈도우 cmd에서 `scp ubuntu@[주소]:[파일] [윈도우 경로]

프리 티어 서버를 사용하고 있기 때문에 서버에서 빌드하면 시간이 오래 걸린다.

### Nginx

포트로 요청이 들어올 때 무슨 내용을 보여줄지 결정해준다. (chk)

nginx config에서 static file을 설정해줬다.

`/etc/nginx/` 에 관련 파일들이 있었다.

> (chk) 리버스 프록시: 어느 포트로 들어오면 설정된 규칙에 따라 다른 포트로 연결하는 것.

/etc/nginx/sites-enabled에 있는 default 설정을 지웠다.

sites-available/enabled 둘에 넣기 귀찮으므로 바로 conf.d 디렉토리에 넣었다.

/etc/nginx/conf.d/todolist.conf

```
server {
        listen 80; // 80번 포트를 듣고 있다.
        server_name _; // ip만 사용하고 있을 때는 _를 쓴다.
        location /api { // 백엔드(Node)로 오는 요청은 다음 주소로 보낸다.
                proxy_pass http://localhost:3001;
        }
        location / { // 프론트엔드(React). 다음 static file을 보인다.
                root /home/ubuntu/jieun-todolist/build; // React 빌드 파일 위치
                index index.html // 가장 먼저 보이는 entry file
                try_files $uri $uri/ /index.html =404; // 앞 경로를 탐색한 후 없으면 404(오류)를 띄운다.
        }
}
```

## 3. 백엔드 배포

개발 모드에서  express 킨 것처럼 똑같이 했다.

서버에 환경을 세팅해 줬다. npm, express, 그 외 의존하고 있는 모듈들을 설치했다.

사용한 명령어는 `npm install`. 

이걸 일일히 할 필요를 없앨려고 도커를 사용한다는 것 같던데, 아직 공부할 길이 멀다.

마지막으로 `nohup node server.js &`로 터미널이 꺼져도 서버가 백그라운드에서 돌아가도록 했다.

`nohup`말고도 `pm2`, `forever` 등이 있다는 것 같다.

종료 명령어: `ps -ef | grep server`(프로세스 찾기) -> `kill -9 PID번호`(해당 프로세스 종료)

  

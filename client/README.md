아래 순서대로 진행하시면 됩니다

0. `npm install -g tailwindcss`
1. `git clone https://github.com/cys0926/webOS.git` or 소스코드 다운로드
2. 해당 소스코드 폴더 들어가서 `npm install`
3. virtual box 실행
4. `npm run build`


데스크탑 환경에서 보시려면 위 단계를 2번까지 진행 한 뒤

1. `npm run serve`
2. www.localhost:8080 접속


더미데이터 json-server로 띄우는 법

1. `npm install -g json-server`
2. `json-server --watch ./src/db/data.json --port 3001`


![image](https://user-images.githubusercontent.com/108395686/197771703-794a5803-547c-481a-97b9-ce0e5d9e815e.png)

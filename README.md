# How to run locally

- Clone the repository.
- cd into the directory.
- install dependecies.
```bash
git clone git@github.com:achitJ/OmniView.git
cd ./OmniView
npm i
```
- Create a PieSocket Account and add the following variables in your .env.local folder:
```.env
NEXT_PUBLIC_JSON_API=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_PIESOCKET_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_PIESOCKET_CLUSTER=YOUR_CLUSTER_ID
```
- run development server
```bash
npm run dev
```

![image](https://github.com/achitJ/OmniView/assets/44137933/65e6d212-8ec3-4925-91c2-d84126551705)

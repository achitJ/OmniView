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

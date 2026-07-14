# BitLinks - Your Trusted URL Shortener 🔗

BitLinks is a simple and fast URL shortener built with Next.js and MongoDB 🚀 This project helps you convert long, messy links into short, shareable URLs in seconds — no tracking, no unnecessary sign-ups, just a clean and reliable shortening service.

![BitLinks Homepage](./screenshots/homepage.png)


## Features
- **Simple Shortening** – Convert long URLs to short links instantly
- **Contact Form** – Reach out directly through the built-in contact page
- **Modern Stack** – Built with Next.js (App Router), React, Tailwind CSS, and MongoDB

## Tech Stack
- Next.js 15 (App Router)
- React
- Tailwind CSS
- MongoDB (Dockerized for local development)

## Getting Started
1. Clone the repo
2. Run `npm install`
3. Start MongoDB via Docker
4. Run `npm run dev`
5. Open `http://localhost:3000`
#

# BitLinks Project End to End Implementation

### In this demo, we will see how to deploy an end to end three tier MERN stack application on EKS cluster.
#
### <mark>Project Deployment Flow:</mark>
<img src="https://github.com/DevMadhup/Wanderlust-Mega-Project/blob/main/Assets/DevSecOps%2BGitOps.gif" />

#

## Tech stack used in this project:
- GitHub (Code)
- Docker (Containerization)
- Jenkins (CI)
- OWASP (Dependency check)
- SonarQube (Quality)
- Trivy (Filesystem Scan)
- Jenkins (CD)
- AWS EC2(Instances)
- Monitoring using grafana and prometheus

### How pipeline will look after deployment:
- <b>CI pipeline to build and push</b>
<img width="1887" height="946" alt="Screenshot (416)" src="https://github.com/user-attachments/assets/ae424111-b635-4ea1-b5fe-bc032b026486" />

- <b>CD pipeline to update application version</b>
<img width="1872" height="960" alt="Screenshot 2026-07-14 132236" src="https://github.com/user-attachments/assets/98ef2cc5-3ede-4665-bd1c-c025d764b4c9" />


#
> [!Important]
> Below table helps you to navigate to the particular tool installation section fast.

| Tech stack    | Installation |
| -------- | ------- |
| Jenkins Master | <a href="#Jenkins">Install and configure Jenkins</a>     |
| Jenkins-Worker Setup | <a href="#Jenkins-worker">Install and configure Jenkins Worker Node</a>     |
| OWASP setup | <a href="#Owasp">Install and configure OWASP</a>     |
| SonarQube | <a href="#Sonar">Install and configure SonarQube</a>     |
| Email Notification Setup | <a href="#Mail">Email notification setup</a>     |
| Monitoring | <a href="#Monitor">Prometheus and grafana setup using helm charts</a>
| Clean Up | <a href="#Clean">Clean up</a>     |
#

### Pre-requisites to implement this project:
#

> [!Note]
> This project will be implemented on Ohio region (us-east-2).

- <b>Create 1 Master machine on AWS with 2CPU, 4GB of RAM (c7i-flex.large) and 15 GB of storage and install Docker on it.</b>
#
- <b>Open the below ports in security group of master machine and also attach same security group to Jenkins worker node (We will create worker node shortly)</b>

<img width="1872" height="432" alt="Screenshot 2026-07-14 143316" src="https://github.com/user-attachments/assets/f39519c1-522f-40a7-afc6-935c1eb9a8ef" />

#

> [!Note]
> We are creating this master machine because we will configure Jenkins master, eksctl, EKS cluster creation from here.

Install & Configure Docker by using below command, "NewGrp docker" will refresh the group config hence no need to restart the EC2 machine.

```bash
sudo apt-get update
```
```bash
sudo apt-get install docker.io -y
sudo usermod -aG docker ubuntu && newgrp docker
```
#
- <b id="Jenkins">Install and configure Jenkins (Master machine)</b>
```bash
sudo apt update -y
sudo apt install fontconfig openjdk-17-jre -y

sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
  
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
  
sudo apt-get update -y
sudo apt-get install jenkins -y
```
- <b>Now, access Jenkins Master on the browser on port 8080 and configure it</b>.

#
  - <b>generate ssh keys (Master machine) to setup jenkins master-slave</b>
  ```bash
  ssh-keygen
  ```
  ![image](https://github.com/user-attachments/assets/0c8ecb74-1bc5-46f9-ad55-1e22e8092198)
#
  - <b>Now move to directory where your ssh keys are generated and copy the content of public key and paste to authorized_keys file of the Jenkins worker node.</b>
#
  - <b>Now, go to the jenkins master and navigate to <mark>Manage jenkins --> Nodes</mark>, and click on Add node </b>
    - <b>name:</b> bitlinks_
    - <b>type:</b> permanent agent
    - <b>Number of executors:</b> 2
    - Remote root directory
    - <b>Labels:</b> Node
    - <b>Usage:</b> Only build jobs with label expressions matching this node
    - <b>Launch method:</b> Via ssh
    - <b>Host:</b> \<public-ip-worker-jenkins\>
    - <b>Credentials:</b> <mark>Add --> Kind: ssh username with private key --> ID: Worker --> Description: Worker --> Username: root --> Private key: Enter directly --> Add Private key</mark>
    - <b>Host Key Verification Strategy:</b> Non verifying Verification Strategy
    - <b>Availability:</b> Keep this agent online as much as possible
#
  - And your jenkins worker node is added
<img width="1907" height="957" alt="Screenshot 2026-07-14 133221" src="https://github.com/user-attachments/assets/50dca654-bafe-4dc9-bf96-2654a6bb6514" />

# 
- <b id="docker">Install docker (Jenkins Worker)</b>

```bash
sudo apt install docker.io -y
sudo usermod -aG docker ubuntu && newgrp docker
```
#
- <b id="Sonar">Install and configure SonarQube (Master machine)</b>
```bash
docker run -itd --name SonarQube-Server -p 9000:9000 sonarqube:lts-community
```
#
- <b id="Trivy">Install Trivy (Jenkins Worker)</b>
```bash
sudo apt-get install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update -y
sudo apt-get install trivy -y
```

#
## Steps to add email notification
- <b id="Mail">Go to your Jenkins Master EC2 instance and allow 465 port number for SMTPS</b>
#
- <b>Now, we need to generate an application password from our gmail account to authenticate with jenkins</b>
  - <b>Open gmail and go to <mark>Manage your Google Account --> Security</mark></b>
> [!Important]
> Make sure 2 step verification must be on
<img width="1893" height="827" alt="Screenshot 2026-07-14 133909" src="https://github.com/user-attachments/assets/77b62ff8-3771-4560-a054-0bc28e218788" />

  - <b>Search for <mark>App password</mark> and create a app password for jenkins</b>

  <img width="1897" height="860" alt="Screenshot 2026-07-14 134149" src="https://github.com/user-attachments/assets/7fe3e982-4074-4976-9aa7-7b2cc0a905c0" />

#
- <b> Once, app password is create and go back to jenkins <mark>Manage Jenkins --> Credentials</mark> to add username and password for email notification</b>

<img width="853" height="882" alt="Screenshot 2026-07-14 134631" src="https://github.com/user-attachments/assets/8b932812-f19a-433c-93f1-4a4baea3bb1d" />


# 
- <b> Go back to <mark>Manage Jenkins --> System</mark> and search for <mark>Extended E-mail Notification</mark></b>

<img width="1865" height="827" alt="Screenshot 2026-07-14 134940" src="https://github.com/user-attachments/assets/37cfbbb8-ac0e-400d-8fac-be67fdf0ee31" />

#
- <b>Scroll down and search for <mark>E-mail Notification</mark> and setup email notification</b>
> [!Important]
> Enter your gmail password which we copied recently in password field <mark>E-mail Notification --> Advance</mark>

<img width="1871" height="813" alt="Screenshot 2026-07-14 135154" src="https://github.com/user-attachments/assets/445c2356-d6a3-4de6-b1a6-6b864391a575" />

<img width="1778" height="767" alt="Screenshot 2026-07-14 135234" src="https://github.com/user-attachments/assets/60cff27b-1d47-4482-aa06-bb0d869bc107" />


#
## Steps to implement the project:
- <b>Go to Jenkins Master and click on <mark> Manage Jenkins --> Plugins --> Available plugins</mark> install the below plugins:</b>
  - OWASP
  - SonarQube Scanner
  - Docker
  - Pipeline: Stage View
#
- <b id="Owasp">Configure OWASP, move to <mark>Manage Jenkins --> Plugins --> Available plugins</mark> (Jenkins Worker)</b>

<img width="1892" height="647" alt="Screenshot 2026-07-14 135555" src="https://github.com/user-attachments/assets/2b844b53-5b44-4303-837d-3c356c624334" />

- <b id="Sonar">After OWASP plugin is installed, Now move to <mark>Manage jenkins --> Tools</mark> (Jenkins Worker)</b>

<img width="1825" height="821" alt="Screenshot 2026-07-14 135751" src="https://github.com/user-attachments/assets/24688c7a-25ef-412d-a46d-25fe6c92f20f" />
#
- <b>Login to SonarQube server and create the credentials for jenkins to integrate with SonarQube</b>

  - Navigate to <mark>Administration --> Security --> Users --> Token</mark>

<img width="1886" height="960" alt="Screenshot 2026-07-14 140147" src="https://github.com/user-attachments/assets/347a730b-6986-4afa-b42f-9b4580d5034a" />
<img width="1845" height="532" alt="Screenshot 2026-07-14 140300" src="https://github.com/user-attachments/assets/4d815ae7-cb31-4867-bdc6-b9b4bd89ccf0" />
<img width="1588" height="533" alt="Screenshot 2026-07-14 152242" src="https://github.com/user-attachments/assets/d39af1fb-368f-415d-a29e-542f593bc464" />


#
- <b>Now, go to <mark> Manage Jenkins --> credentials</mark> and add Sonarqube credentials:</b>
![image](https://github.com/user-attachments/assets/0688e105-2170-4c3f-87a3-128c1a05a0b8)
#
- <b>Go to <mark> Manage Jenkins --> Tools</mark> and search for SonarQube Scanner installations:</b>
![image](https://github.com/user-attachments/assets/2fdc1e56-f78c-43d2-914a-104ec2c8ea86)
#
- <b> Go to <mark> Manage Jenkins --> credentials</mark> and add Github credentials to push updated code from the pipeline:</b>

<img width="954" height="868" alt="Screenshot 2026-07-14 140552" src="https://github.com/user-attachments/assets/2b3671bb-7f89-42d0-9b36-f0c38a0ac491" />

> [!Note]
> While adding github credentials add Personal Access Token in the password field.
#
- <b>Go to <mark> Manage Jenkins --> System</mark> and search for SonarQube installations:</b>

<img width="1848" height="821" alt="Screenshot 2026-07-14 140720" src="https://github.com/user-attachments/assets/024043c7-8126-4fff-80d4-8f0d3f77d38e" />

#
- <b>Now again, Go to <mark> Manage Jenkins --> System</mark> and search for Global Trusted Pipeline Libraries:</b
  <img width="1860" height="830" alt="Screenshot 2026-07-14 140938" src="https://github.com/user-attachments/assets/ab2c7895-c117-45fb-8725-da992a976004" />

  <img width="1823" height="815" alt="Screenshot 2026-07-14 141015" src="https://github.com/user-attachments/assets/cc9a0f74-bc59-4482-b25a-81da834edaf2" />

#
- <b>Login to SonarQube server, go to <mark>Administration --> Webhook</mark> and click on create </b>
<img width="1867" height="732" alt="Screenshot 2026-07-14 141053" src="https://github.com/user-attachments/assets/0f48c825-e703-4ddf-9d88-5f01eeae87eb" />
<img width="713" height="758" alt="Screenshot 2026-07-14 141217" src="https://github.com/user-attachments/assets/21c855e6-b49a-4ff4-b8ae-06d963c0c98a" />

#
- <b>Navigate to <mark> Manage Jenkins --> credentials</mark> and add credentials for docker login to push docker image:</b>
<img width="792" height="857" alt="Screenshot 2026-07-14 141312" src="https://github.com/user-attachments/assets/b4df73d7-8aa8-4745-af78-892c75782f30" />

#
- <b>Create a <mark>Bitlinks_CI & Bitlinks_CD</mark> pipeline</b>

<img width="1908" height="697" alt="Screenshot 2026-07-14 141454" src="https://github.com/user-attachments/assets/4d19ba44-68e3-41b9-9bcd-b95c3a3f163f" />
<img width="1877" height="963" alt="Screenshot 2026-07-14 141432" src="https://github.com/user-attachments/assets/090f171a-a8f8-4486-ae20-c5f01bd830a6" />



#
- <b>Provide permission to docker socket so that docker build and push command do not fail (Jenkins Worker)</b>
```bash
chmod 777 /var/run/docker.sock
```
![image](https://github.com/user-attachments/assets/e231c62a-7adb-4335-b67e-480758713dbf)
#

- <b>Open port 80 on worker node and Access it on browser</b>
```bash
<worker-public-ip>:80
```
<img width="1895" height="818" alt="Screenshot 2026-07-14 155825" src="https://github.com/user-attachments/assets/97e07645-6f70-43aa-86f2-7a980e1e4ab1" />
<img width="1915" height="955" alt="Screenshot (403)" src="https://github.com/user-attachments/assets/fe0f62b1-c248-40fc-a11b-0c7ca111cb0e" />
<img width="1913" height="952" alt="Screenshot (414)" src="https://github.com/user-attachments/assets/62a84c30-9a49-4bde-aaaf-f42ed5bfbdec" />
<img width="1890" height="917" alt="Screenshot 2026-07-14 160509" src="https://github.com/user-attachments/assets/579d5a7d-616a-485f-8b7e-5161f6629c77" />
<img width="1890" height="963" alt="Screenshot 2026-07-14 160536" src="https://github.com/user-attachments/assets/4347aeb7-9433-453c-8f0c-85e393b49183" />


- <b>Email Notification</b>
<img width="1902" height="853" alt="Screenshot 2026-07-14 141633" src="https://github.com/user-attachments/assets/a1cce563-f830-4eb6-9947-2275f56b9063" />


#
## How to monitor Bitlinks_app using prometheus and grafana via HELM (On Master machine)

#
- Expose Prometheus and Grafana to the external world through Node Port

```bash
kubectl edit svc stable-kube-prometheus-sta-prometheus -n prometheus
```
![image](https://github.com/user-attachments/assets/90f5dc11-23de-457d-bbcb-944da350152e)
![image](https://github.com/user-attachments/assets/ed94f40f-c1f9-4f50-a340-a68594856cc7)

#
- Verify service
```bash
kubectl get svc -n prometheus
```

#
- Now,let’s change the SVC file of the Grafana and expose it to the outer world
```bash
kubectl edit svc stable-grafana -n prometheus
```
![image](https://github.com/user-attachments/assets/4a2afc1f-deba-48da-831e-49a63e1a8fb6)

#
- Check grafana service
```bash
kubectl get svc -n prometheus
```

#
- Get a password for grafana
```bash
kubectl get secret --namespace prometheus stable-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```
> [!Note]
> Username: admin

#
- Now, view the Dashboard in Grafana

<img width="1891" height="964" alt="Screenshot (397)" src="https://github.com/user-attachments/assets/4c946746-2f7e-4bfe-a902-e5cb7ef9f5fa" />

<img width="1910" height="945" alt="Screenshot (396)" src="https://github.com/user-attachments/assets/01a159f6-0cbb-4128-bde5-4d9918cd357f" />

#
## Clean Up
- <b id="Clean">Delete docker container </b>
```bash
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)
docker network prune -f
```
- <b id="Clean"> OR, All-in-one-nuclear option </b>
```bash

docker system prune -a --volumes -f
```

#

## License
MIT

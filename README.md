<p align="center" style="margin-bottom:35px;">
    <picture>
      <source width="500px" media="(prefers-color-scheme: dark)" srcset="https://gist.githubusercontent.com/OlekAleksander/6354a810176f537e4d629f08755a5c7f/raw/4fb6f00040edc7a6594cd20bfa5a874247569034/logo_dark.svg">
      <source width="500px" media="(prefers-color-scheme: light)" srcset="https://gist.githubusercontent.com/OlekAleksander/6354a810176f537e4d629f08755a5c7f/raw/4fb6f00040edc7a6594cd20bfa5a874247569034/logo.svg">
      <img width="500px" src="https://gist.githubusercontent.com/OlekAleksander/6354a810176f537e4d629f08755a5c7f/raw/4fb6f00040edc7a6594cd20bfa5a874247569034/logo.svg">
    </picture>
    <h1 align="center">Looking Glass</h1>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
            <img src="https://img.shields.io/badge/honojs-e36002.svg?style=for-the-badge&logo=hono&logoColor=white" />
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white" />

</p>

# Lumen Looking Glass

A modern Looking Glass solution, an updated replacement/alternative for [Smokey](https://github.com/KittensAreDaBest/smokey).

## Installation

### Website

1. **Install Node.js 21 or higher:**

   ```sh
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    nvm install node
   ```

2. **Download Dependencies:**

   ```sh
   sudo npm install -g pm2 bun
   ```

3. **Clone the Repository:**

   ```sh
   git clone https://github.com/LumenPanel/looking-glass
   ```

4. **Navigate to the Frontend Folder:**

   ```sh
   cd <repository-folder>/frontend
   ```

5. **Install Node Modules:**

   ```sh
   bun install
   ```

6. **Edit Configuration (config.json):**
   Use your preferred editor to modify the configuration files as needed.

   ```sh
   vim config.json
   ```

7. **Build and Run the App:**

   ```sh
   bun build
   pm2 start "bun start" --name lookingglass
   pm2 save
   ```

8. **Access the App:**
   The app should now be running on port **3000**.

9. **Optional - Set Up a Reverse Proxy:**
   Configure a reverse proxy to access the website from a domain.

### Backend (Install on Each Node)

1. **Install Node.js:**

   ```sh
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    nvm install node
   ```

2. **Download Dependencies:**

   ```sh
   sudo npm install -g pm2 bun

   # If you are using a debian based distro:
   sudo apt-get install bird traceroute mtr -y

   # If you are using a fedora based distro:
   sudo dnf install bird traceroute-3 mtr
   ```

3. **Clone the Repository:**

   ```sh
   git clone https://github.com/LumenPanel/looking-glass
   ```

4. **Navigate to the Backend Folder:**

   ```sh
   cd <repository-folder>/backend
   ```

5. **Install Node Modules:**

   ```sh
   bun install
   ```

6. **Run the App:**

   ```sh
   pm2 start "bun start" --name lookingglass
   pm2 save
   ```

7. **Access the App:**
   The app should now be running on port **8080**.

8. **Optional - Set Up SSL:**
   Configure a reverse proxy to enable SSL, especially if the website runs on `https://`.

## License

Lumen Looking Glass is licensed under the MIT license.

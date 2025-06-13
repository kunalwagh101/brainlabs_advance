

# STEPS TO RUN THE APPLICATION

# Clone the repository

    git clone https://github.com/kunalwagh101/brainlabs.git

# Create a virtual environment

**For Linux and macOS**

 ```bash
    python3.8 -m venv venv
    source venv/bin/activate
 ```

**For Windows**
```bash
  
    python -m venv venv 
    venv/Scripts/activate
```


# Install the necessary modules
```bash
    pip install -r requirements.txt
```



# run the migration commands 

**cd to the backend directory**
```bash
    cd brainlabs/backend
```

```bash
    python manage.py makemigrations
    python manage.py migrate
```


# Run the application



**run backend server using below command**



  ```bash
    python manage.py runserver
  ```
**Run the frontend server using below command on different terminal**
```bash
    cd ../frontend
    npm install
    npm start
```

# Access the application
**Open your browser and navigate to the following URL**

```bash
    http://localhost:3000/
```
# Alternatively, you can also run the backend server on a different port

```bash
    python manage.py runserver 8000
```





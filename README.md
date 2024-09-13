<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
   <picture>
      <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1725492558/logo-plain_i8cldo.png" alt="Banner">
   </picture>

<h3 align="center">Atalanta A.C.</h3>

  <p align="center">
    Atalanta A.C. – Your ultimate destination for cutting-edge sportswear, offering a sleek, seamless shopping experience with secure payments and real-time order tracking.
    <br />
    <a href="/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.atalanta.world">View Demo</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#project-overview">Project Overview</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#future-enhancements">Future Enhancements</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->

## About The Project

[![Atalanta A.C. Homepage Screenshot][product-screenshot]](https://example.com)

**Atalanta A.C.** is a sportswear platform that brings you the latest in trendy styles and athletic equipment. Designed with a sleek user interface, secure payment processing, and robust order management, it offers a hassle-free shopping experience for all users.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

-   [![React][React.js]][React-url]
-   [![Vite]][Vite-url]
-   [![Material UI]][Material-url]
-   [![AWS]][AWS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project Overview

-   **Live Demo**: <a href="https://www.atalanta.world">atalanta.world</a>

Atalanta A.C. allows users to:

-   Browse and purchase sportswear and equipment.
-   Create an account to track orders and view order history.
-   Opt for guest checkout with email-based order tracking using a unique order number.

_Note: Integrated with Stripe for secure and seamless payments, providing peace of mind to users during checkout._

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Key Features

1. **Account Creation and Order Tracking**

    - Users can create accounts to manage their orders and view order history.
    - Email verification ensures account authenticity (check your spam folder if nothing shows up).

2. **Guest Checkout**

    - Offers convenient guest checkout. Users receive an order number via email to track orders without needing an account.

3. **Secure Payments via Stripe**

    - Integrated Stripe API for secure, hassle-free payment processing.

4. **Responsive Design**

    - Fully responsive design ensures smooth browsing across devices.

5. **Order Confirmation Emails**

    - Users receive detailed order confirmation emails, providing all relevant purchase information.

6. **Cloud Hosting and Storage**
    - Hosted entirely on AWS (Docker, ECR, App Runner, Route 53) with assets secured in AWS S3 and data stored in MySQL RDS.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Architecture

Atalanta A.C. is structured into two core components:

1. **Frontend**

    - Built with **React JS** and **TypeScript**, powered by **Vite** for fast development and builds.
    - State management is handled using React hooks, providing smooth UI interactions.
    - Deployed on **AWS App Runner**, allowing automatic scaling.

2. **Backend**

    - Built on **Laravel**, providing API endpoints for managing user data, orders, and inventory.
    - Data is stored in **MySQL RDS**, and media assets are managed through **AWS S3** for efficient delivery.

3. **CI/CD Pipeline**

    - The deployment process is handled via a **custom script**.
    - Running `npm run deploy`:
        1. Builds the Docker image for the application.
        2. Pushes the new Docker image to **AWS ECR**.
        3. **AWS App Runner** automatically triggers a new deployment using the updated image.
    - This setup ensures that code changes are deployed live with minimal manual intervention.

4. **Admin Dashboard**
    - For backend management (e.g., inventory, order tracking), check out the [Admin Dashboard GitHub Repo](https://github.com/noelys215/atalanta_laravel).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Screenshots

-   **Create Account**  
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190205/Register-Atalanta_plr7ei.png" alt="Create Account Screenshot">

-   **Confirm Email**  
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190205/Confirm-your-email-address-noelys215-gmail-com-Gmail_mxhn2w.png" alt="Confirm Email Screenshot">
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190205/Email-Verified-Atalanta_wjhcvf.png" alt="Email Verified Screenshot">

-   **Log In**  
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190204/Doe-Atalanta_eejfvq.png" alt="Login Screenshot">

-   **Browse Products**  
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190205/Accessories-Atalanta_b9lmwc.png" alt="Browse Products Screenshot">
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190204/Accessories-Atalanta_1_vtc8qz.png" alt="Accessories Screenshot">

-   **Checkout**  
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190204/Checkout-Atalanta_xvi82a.png" alt="Checkout Screenshot">
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190204/Order-Details-Atalanta_htdgwl.png" alt="Order Details Screenshot">
    <img src="https://res.cloudinary.com/dshviljjs/image/upload/v1726190204/Thank-you-for-your-payment-noelys215-gmail-com-Gmail_m1bkvi.png" alt="Payment Confirmation Screenshot">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Future Enhancements

-   **Auto-Complete Address**: Implement address auto-completion during profile creation.
-   **Improved CAPTCHA**: Upgrade to a more secure CAPTCHA solution.
-   **Analytics Integration**: Integrate Meta Pixel or Google Analytics for better tracking.
-   **SMS Verification**: Add SMS verification as an optional security feature.
-   **Product Page Redesign**: Revamp product pages for a more luxurious aesthetic.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contact

**Henry Betancourth**

-   Email: [noelys215@gmail.com](mailto:noelys215@gmail.com)
-   GitHub Repo: [Atalanta Frontend Repo](https://github.com/noelys215/atalanta_frontend_ii)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[product-screenshot]: https://res.cloudinary.com/dshviljjs/image/upload/v1726187813/Home-Atalanta_ltsxpl.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite]: https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/
[Material UI]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[Material-url]: https://mui.com/material-ui/
[AWS]: https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white
[AWS-url]: https://aws.amazon.com/

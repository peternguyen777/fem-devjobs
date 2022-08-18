![alt text](https://pnguyen-portfolio.vercel.app/detail/desktop/image-devjobs-hero@2x.jpg)

### Deployment:https://fem-devjobs.vercel.app/ ###

----

This project started as front-end challenge and the aim was to create a responsive mobile-first devjobs dashboard. With performance in mind, NextJS is used for its dynamic routing capability, allowing for multiple permutations of job listings with Static Site Generation.

Sanity - a Headless CMS (Content Management System) - is used to host the job data in the back-end, allowing a no-code interface for approving and editting job posts. The application allows anyone to post a job directly through a front-page modal. This form is validated with React-Hook-Form and Yup before being sent to Sanity via NextJS' API routes. Then the job post is reviewed by an administrator using Sanity studio before being approved to appear on the front page.

One challenging aspect of the app was the integration of a dark-mode toggle, integrating both the system dark mode as default, whilst allowing for manual toggling. Using the Next-Theme custom hook, the application is rehydrated to preserve the state of the toggle upon page reload.

          
![alt text](https://pnguyen-portfolio.vercel.app/detail/desktop/image-devjobs-preview-2@2x.jpg)
![alt text](https://pnguyen-portfolio.vercel.app/detail/desktop/image-devjobs-preview-1@2x.jpg)


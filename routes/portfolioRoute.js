const router = require("express").Router();

const {
    Intro,
    About,
    Project,
    Contact,
    Experience,
    Course,
} = require('../models/portfolioModel');
const User = require("../models/userModel");

//get all portfolio data


router.get('/get-portfolio-data', async (req, res) => {

    try {

        const intros = await Intro.find();
        const abouts = await About.find();
        const projects = await Project.find();
        const contacts = await Contact.find();
        const experiences = await Experience.find();
        const courses = await Course.find();

        res.status(200).send({
            intro: intros[0],
            about: abouts[0],
            projects: projects,
            Contact: contacts[0],
            experiences: experiences,
            courses: courses,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update intro
router.post("/update-intro", async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: intro,
            success: true,
            message: "Intro update successfully"
        });
    } catch (error) {
        res.status(500).send(error);

    }
});

//update About Me
router.post("/update-about", async (req, res) => {
    try {
        const about = await About.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: about,
            success: true,
            message: "About Me update successfully"
        });
    } catch (error) {
        res.status(500).send(error);

    }
});

//add experience

router.post("/add-experience", async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience Added Successfully",

        });
    } catch (error) {
        res.status(500).send(error);

    }
});

//Udate experience

router.post("/update-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience Updates Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete experience

router.post("/delete-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndDelete(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience Deleted Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


//add Project

router.post("/add-project", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(200).send({
            data: project,
            success: true,
            message: "Project Added Successfully",

        });
    } catch (error) {
        res.status(500).send(error);

    }
});

//Udate Project

router.post("/update-project", async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project Updates Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete Project

router.post("/delete-project", async (req, res) => {
    try {
        const project = await Project.findOneAndDelete(
            { _id: req.body._id },
            //req.body,
            //{ new: true }
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project Deleted Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


//add Courses

router.post("/add-course", async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).send({
            data: course,
            success: true,
            message: "Course Added Successfully",

        });
    } catch (error) {
        res.status(500).send(error);

    }
});

//Udate Courses

router.post("/update-course", async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: course,
            success: true,
            message: "Course Updates Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete course

router.post("/delete-course", async (req, res) => {
    try {
        const course = await Course.findOneAndDelete(
            { _id: req.body._id },
            //req.body,
            //{ new: true }
        );
        res.status(200).send({
            data: course,
            success: true,
            message: "Course Deleted Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


//Udate contacts

router.post("/update-contact", async (req, res) => {
    try {
        const course = await Contact.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: Contact,
            success: true,
            message: "Contact Updates Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//admin login

router.post("/admin-login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        user.password = "";
        if (user) {
            res.status(200).send({
                data: user,
                success: true,
                message: "Login Successfull",
            });
        }
        else{
            res.status(200).send({
                data: user,
                success: false,
                message: "Invalid username or password",
            })
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router;
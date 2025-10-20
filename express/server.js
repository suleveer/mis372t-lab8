import express from 'express';

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

//custom logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} request made at ${req.url} -- Body: ${JSON.stringify(req.body)}`);
    next();
})

app.get('/about', (req, res) => {
    res.send("About page")

})

app.post('/submit', (req,res) => {
    res.send("Submitted")
})

app.put('/update', (req, res) => {
    res.send("Update successful")
})

app.delete('/delete', (req, res) => {
    res.send("Delete successful")
})


app.get('/', (req, res) => {
    res.send("Hello");
})

app.get('/api/employees', (req, res) => {
    res.json(employeesList)
})

let employeesList = []
app.post('/api/employees', (req, res) => {
    const {employeeid, name, email} = req.body;
    const id = employeeid ? String(employeeid) : employeeid;
    const newEmployee = {employeeid: id, name:name, email:email};
    employeesList.push(newEmployee)
    res.status(201).json(newEmployee);
})

app.put('/api/employees/:employeeid', (req, res) => {
    const {employeeid} = req.params;
    const {name,email} = req.body;
    const targetId = String(employeeid);
    const updatedEmployee = {employeeid:targetId,name:name,email:email}
    employeesList = employeesList.map(item => String(item.employeeid) === targetId ? updatedEmployee : item)
    res.status(200).json(updatedEmployee)

})


app.delete('/api/employees/:employeeid', (req,res) => {
    const {employeeid} = req.params;
    const id = String(employeeid);
    const oglength = employeesList.length;
    employeesList = employeesList.filter(item => item.employeeid !== id);

    if (oglength === employeesList.length)
        {
        return res.status(204).json({message:"employee not found"})
        }
    res.status(204).send();

})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message:"internal server error"})
})

app.use((req, res,) => {
    res.status(404).json({message:"route not found"})

})


app.listen(port, (req, res) =>
{
    console.log(`Server running on localhost:${port}`)
})

export default app;


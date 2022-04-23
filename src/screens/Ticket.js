import React, {useEffect, useState} from 'react';
import {
    Button, CardMedia,
    Container, CssBaseline,
    Grid,
    MenuItem,
    Rating,
    Slider,
    TextField,
    Typography,
    Select
} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import Box from "@mui/material/Box";

const Ticket = ({editMode}) => {
    const [tickets, setTickets] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://shuda.herokuapp.com/tickets')
            const dataObject = response.data.data
            const arrayOfKeys = Object.keys(dataObject)
            const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key])
            const formattedArray = []
            arrayOfKeys.forEach((key, index) => {
                const formmatedData = { ...arrayOfData[index] }
                formmatedData['documentId'] = key
                formattedArray.push(formmatedData)
            })

            setTickets(formattedArray)
        }
        fetchData()
    }, [])

    const uniqueCategories = [
        ...new Set(tickets?.map(({ category }) => category)),
    ]
    const [formData, setFormData] = useState({
        status: 'in progress',
        progress: 0,
        timestemp: new Date().toISOString(),
        priority: '0',
    })

    const navigate = useNavigate();
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(editMode) {
            const response = await axios.put(`https://shuda.herokuapp.com/tickets/${id}`, {
                data: formData
            })
            if (response.status === 200) {
                navigate('/')
            }
        }

        if (!editMode) {
            const response = await axios.post('https://shuda.herokuapp.com/tickets', {formData})

            if (response.status === 200) {
                navigate('/')
            }
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState => ({
            ...prevState,
            [name]: value
        })))
    }

    const fetchData = async () => {
        const response = await axios.get(`https://shuda.herokuapp.com/tickets/${id}`)
        setFormData(response.data.data[0])
    }

    useEffect(() => {
        if (editMode) {
            fetchData()
        }
    }, [])

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {editMode ? 'Update' : 'Create'}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2} gridRow>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                required
                                value={formData.title}
                                name={'title'}
                                label="Title"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                value={formData.category}
                                name={'category'}
                                label="New Category"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                required
                                value={formData.description}
                                name={'description'}
                                label="Description"/>
                        </Grid>
                        <Grid item xs={12}
                              sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                fullWidth
                            >
                                {tickets && uniqueCategories?.map((category, index) => (
                                    <MenuItem value={category} key={index}>{category}</MenuItem>
                                ))}
                            </Select>

                            <Rating
                                style={{width: '100%', minWidth: 250}}
                                onChange={handleChange}
                                name={'priority'}
                                value={Number(formData.priority)}
                            />
                        </Grid>

                        {!editMode && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Slider
                                        defaultValue={30}
                                        name={'progress'}
                                        onChange={handleChange}
                                        value={formData.progress}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="non-linear-slider"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        onChange={handleChange}
                                        name={'statuser'}
                                        required
                                        label="Status"
                                        style={{width: '100%', minWidth: 250}}
                                        value={formData.statuser}>
                                        <MenuItem
                                            selected={formData.statuser === 'done'}
                                            value={'done'}
                                        >DONE</MenuItem>
                                        <MenuItem
                                            selected={formData.statuser === 'in progress'}
                                            value={'in progress'}
                                        >In Progress</MenuItem>
                                        <MenuItem
                                            selected={formData.statuser === 'stuck'}
                                            value={'stuck'}
                                        >Stuck</MenuItem>
                                        <MenuItem
                                            selected={formData.statuser === 'not started'}
                                            value={'not started'}
                                        >Not Started</MenuItem>
                                    </TextField>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                required
                                value={formData.owner}
                                name={'owner'}
                                label="Owner"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                onChange={handleChange}
                                required
                                value={formData.avatar}
                                name={'avatar'}
                                label="Avatar keywords"/>
                        </Grid>
                        <Grid item xs={12}>
                            {formData.avatar && (
                                <CardMedia
                                    component="img"
                                    image={`https://source.unsplash.com/random?${formData.avatar}&sig=${Math.random()}`}
                                    alt="avatar"
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Ticket;
import React, { useEffect, useState } from 'react';
import { Container, Grid,Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardBox from "../components/Card";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
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
    const navigate = useNavigate();
    const uniqueCategories = [
        ...new Set(tickets?.map(({ category }) => category)),
    ]

    return (
        <Container component="main">
            <Button style={{position: 'fixed', top: 20, marginTop: 10}} variant="contained" onClick={() => navigate('/yangi')}>ADD NEW</Button>
            <Typography variant={'h2'}>POSTS</Typography>

            <Grid container spacing={2}>
                {tickets && uniqueCategories?.map((unique, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Typography variant={'h5'}>#{unique}</Typography>
                        {tickets.filter(ticket => ticket.category === unique)
                            .map((ticket, keys) => (
                                <div style={{ marginBottom: 15 }}key={keys}>
                                    <CardBox
                                        url={ticket.avatar}
                                        title={ticket.title}
                                        description={ticket.description}
                                        progress={ticket.progress}
                                        status={ticket.status}
                                        priority={Number(ticket.priority)}
                                        id={ticket.documentId}
                                    />
                                </div>
                            ))}
                    </Grid>
                ))}
            </Grid>


        </Container>
    );
};

export default Dashboard;
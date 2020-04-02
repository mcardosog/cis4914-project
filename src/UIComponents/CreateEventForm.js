import React, { useState } from "react";
import { withFirebase } from '../components/Firebase';

import { Form, Grid, Button, Icon } from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';

export default function EventForm({organization, addEvent, updateEvents, closeModal}) {
    const [values, setValues] = useState({
        id: "",
        name: "",
        code: "",
        active: false,
        minimum_level: "",
        allowedUsers: '',
        notAllowedUsers: '',
        description: "",
        date: ""
    });

    const [isValid, setIsValid] = useState(true);

    const options = [
        {
            key: '1',
            text:'1',
            value:'1'
        },
        {
            key: '2',
            text:'2',
            value:'2'
        },
        {
            key: '3',
            text:'3',
            value:'3'
        },
        {
            key: '4',
            text:'4',
            value:'4'
        },
        {
            key: '5',
            text:'5',
            value:'5'
        }
    ]

    var formValues = values;

    var valid = isValid;

    var onChange = (name, value) => {
        formValues[name] = value;
        setValues(formValues);
        valid = values.name === "" || 
                values.code === "" ||
                values.minimum_level === "" || 
                values.allowedUsers === "" ||
                values.notAllowedUsers === "" ||
                values.description === "" ||
                values.date === "";
        setIsValid(valid);
    };

    var onSubmit = async () => {
        const eventAdded = await addEvent(
            organization,
            values.id,
            values.name,
            values.minimum_level,
            values.allowedUsers,
            values.notAllowedUsers,
            values.description,
            values.date,
            values.code);
        if(!eventAdded) {
            alert('Event ID already in use. Verify if the event was already entered.');
        }
        closeModal();
        updateEvents();
    };

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Form noValidate onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Input
                                label="Event Name"
                                name="name"
                                type="text"
                                maxLength="15"
                                // value={values.name}
                                onChange={(param, data) => {
                                    onChange(data.name, data.value);
                                }}
                            />
                            <Form.Input
                                label="Event Code"
                                name="code"
                                type="text"
                                // value={values.code}
                                maxLength="5"
                                onChange={(param, data) => {
                                    onChange(data.name, data.value.toUpperCase());
                                }}
                            />
                            <Form.Input
                                label="Event ID"
                                name="id"
                                type="text"
                                // value={values.code}
                                maxLength="10"
                                onChange={(param, data) => {
                                    onChange(data.name, data.value);
                                }}
                            />
                        </Form.Group>
                        <Form.TextArea
                            label="Description"
                            name="description"
                            type="text"
                            // value={values.description}
                            onChange={(param, data) => {
                                onChange(data.name, data.value);
                            }}
                        />
                        <Form.Group>
                            <Form.Input
                                label="Allowed Users"
                                name="allowedUsers"
                                type="text"
                                // value={values.description}
                                onChange={(param, data) => {
                                    onChange(data.name, data.value);
                                }}
                            />
                            <Form.Dropdown
                                label = "Minimum Level"
                                name = "minimum_level"
                                placeholder = "Level 1 - 5"
                                fluid
                                selection
                                // value={checkInData.company}
                                options = {options}
                                onChange={(param, data) => {
                                  onChange(data.name, data.value);
                                }}
                            />
                            <Form.Field
                                content={
                                    <SemanticDatepicker 
                                        name="date" 
                                        label="Start Date"
                                        onChange={(param, data) => {
                                            /* Convert the date object to a string. Locale means that the format of the string will
                                             * be in accordance to the region using the application.
                                             * For the use it will be MM/DD/YYYY
                                             */
                                            const dateString = data.value.toLocaleDateString();
                                            onChange(data.name, dateString)}
                                        }
                                    />
                                }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input
                                label="Not Allowed Users"
                                name="notAllowedUsers"
                                type="text"
                                // value={values.description}
                                onChange={(param, data) => {
                                    onChange(data.name, data.value);
                                }}
                            />
                        </Form.Group>
                        <Button
                            content="Cancel"
                            color="red"
                            icon="cancel"
                            labelPosition="left"
                            floated="right"
                            onClick = {()=>{
                                closeModal();
                            }}
                        />
                        <Button
                            type="submit"
                            disabled={isValid}
                            content="Submit"
                            color="green"
                            icon="check"
                            labelPosition="left"
                            floated="right"
                        />
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
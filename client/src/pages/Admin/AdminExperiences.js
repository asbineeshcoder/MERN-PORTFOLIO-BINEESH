import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, message } from 'antd';
import { ShowLoading, HideLoading, ReloadData } from '../../redux/rootSlice';
import axios from 'axios';
import Item from 'antd/es/list/Item';
//import {message} from 'antd';

function AdminExperiences() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemforedit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading())
            let response
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-experience", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });

            } else {
                response = await axios.post("/api/portfolio/add-experience", values);
            }

            dispatch(HideLoading())
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemforedit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message)
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (Item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/delete-experience", {
                _id: Item._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary text-white py-2 px-8  rounded-md'
                    onClick={() => {
                        setSelectedItemforedit(null);
                        setShowAddEditModal(true);
                    }}
                >Add Experience</button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1'>
                {experiences.map((experience) => (
                    <div className='shadow border p-5 border-gray-400  flex flex-col gap-2'>
                        <h1 className='text-orange text-2xl font-bold'>{experience.period}</h1>
                        <hr />
                        <h1>Company: {experience.company}</h1>
                        <h1>Role: {experience.title}</h1>
                        <h1>JD: {experience.description}</h1>
                        <div className='flex gap-5 mt-6'>
                            <button className='bg-primary text-white py-2 px-8  rounded-md'
                                onClick={() => {
                                    setSelectedItemforedit(experience);
                                    setShowAddEditModal(true);
                                    setType("edit");
                                }}>
                                Edit</button>
                            <button className='bg-black text-white px-8 py-2  rounded-md'
                                onClick={() => {
                                    onDelete(experience);
                                }}
                            >Delete</button>
                        </div>
                    </div>

                ))}


                {(type === "add" || selectedItemForEdit) && (


                <Modal
                    visible={showAddEditModal}
                    title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
                    footer={null}
                    onCancel={() => {
                        setShowAddEditModal(false);
                        setSelectedItemforedit(null);
                    }}
                >
                    <Form layout='vertical' onFinish={onFinish}
                        initialValues={selectedItemForEdit || {}}>
                        <Form.Item name='period' label='Period'>
                            <input placeholder='Period' />
                        </Form.Item>
                        <Form.Item name='company' label='Company'>
                            <input placeholder='Company' />
                        </Form.Item>
                        <Form.Item name='title' label='Title'>
                            <input placeholder='Title' />
                        </Form.Item>
                        <Form.Item name='description' label='Description'>
                            <input placeholder='Description' />
                        </Form.Item>

                        <div className='flex'>
                            <button className='border-primary text-primary py-2 px-2'
                                onClick={() => {
                                    setShowAddEditModal(false);
                                }}
                            >
                                Cancel</button>
                            <button className='bg-primary text-white py-2 px-2'>
                                {selectedItemForEdit ? "Update" : "Add"}
                            </button>
                        </div>
                    </Form>
                </Modal>

)}
            </div>
        </div>
    );
}

export default AdminExperiences;

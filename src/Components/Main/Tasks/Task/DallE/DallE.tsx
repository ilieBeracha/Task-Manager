import "./DallE.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { TaskModel } from '../../../../../model/TaskModel';
import { apiService } from '../../../../../Service/ApiService';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Spinner from "../../../../Spinner/Spinner";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function DallE({ task, refreshTasks, setRefreshTasks }: { task: TaskModel, refreshTasks: any, setRefreshTasks: any }): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState<any>();
    const [loading,setLoading] = React.useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function createImage(content: any) {
        setLoading(true)
        let image = await apiService.imageGeneratorOpenAi(content);
        console.log(image);
        setImage(image)
    }

    async function saveImageToDB() {
        setLoading(false)
        setRefreshTasks(!refreshTasks)
        handleClose();
        const id = task.id;
        await apiService.saveImageToDB(image, id);
    }

    async function deleteExistingImage(){
        setRefreshTasks(!refreshTasks)
        handleClose();
        const id = task.id
        await apiService.deleteImageFromDB(id)
    }
    return (
        <div className="DallE">
            <button onClick={handleOpen}>
                <AddPhotoAlternateIcon fontSize="small" />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Image
                    </Typography>
                    <div className='PopUpAddImageDiv'>
                        <form onSubmit={handleSubmit(createImage)} action="">
                            <label htmlFor="">Dall-E Image generator</label>
                            <input type="text" {...register('query')} />
                            <select id="" {...register('type')}>
                                <option value="illustration">illustration</option>
                                <option value="realistic">realistic</option>
                                <option value="cartoon">cartoon</option>
                                <option value="anime">anime</option>
                            </select>
                            <button type="submit">Try</button>
                            {
                                task.imageUrl?
                                <button type="button" onClick={deleteExistingImage}>Delete image</button>
                            :<></>}
                        </form>

                        {image === undefined &&loading? 
                            <div className="imagePlaceholderDallE">
                               
                                {task.imageUrl?
                                    <img src={task.imageUrl} alt="" />
                                : <Spinner />}
                            </div>
                            : image ?
                                <div className="DallResults">
                                    <img src={image} alt="" />
                                    <button onClick={saveImageToDB}>Add to task</button>
                                </div>
                                : <></>}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default DallE;

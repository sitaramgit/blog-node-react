import { memo, useState } from "react"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from "@mui/material/Stack";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SendIcon from '@mui/icons-material/Send';
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { API_REQUESTS } from "../../common/apiRequests";
import { httpService } from "../../services/httpService";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface IFormInput {
    title: string;
    content: string;
    files: FileList;
}
let EditorModules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  let editorFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

const CreatePost = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const { register, handleSubmit, formState: { errors }, control } = useForm<IFormInput>();
    const [editorValue, setEditorValue] = useState('');

    const onSubmit = async (data: IFormInput) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('coverImage', data.files[0]);
      API_REQUESTS.CREATE_POST.PAYLOAD = formData;
      try {
        const res = httpService(API_REQUESTS.CREATE_POST);
        console.log(res)
        navigate('/home')
      } catch (error) {
        console.log(error)
      }
    };
    return (
        <Box sx={{ flexGrow: 1, marginTop: '10px' }}>
            <Grid container spacing={2}>
                <Grid size={2}>

                </Grid>
                <Grid size={8}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxWidth: 600,
                                margin: 'auto',
                                padding: 4,
                                borderRadius: 2,
                                boxShadow: 2,
                            }}
                        >
                            {/* File Upload */}
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <input
                                    type="file"
                                    hidden
                                    {...register('files', { required: 'Please upload a file' })}
                                    multiple
                                />
                            </Button>
                            {errors.files && (
                                <p style={{ color: 'red' }}>{errors.files.message}</p>
                            )}

                            {/* Title Input */}
                            <TextField
                                fullWidth
                                label="Title"
                                id="title"
                                error={!!errors.title}
                                helperText={errors.title ? errors.title.message : ''}
                                {...register('title', { required: 'Title is required' })}
                            />

                            {/* Content (ReactQuill) */}
                            <Controller
                                name="content"
                                control={control}
                                rules={{ required: 'Content is required' }}
                                render={({ field }) => (
                                    <>
                                        <ReactQuill
                                            theme="snow"
                                            value={editorValue}
                                            modules={EditorModules}
                                            formats={editorFormats}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                setEditorValue(value);
                                            }}
                                        />
                                        {errors.content && (
                                            <p style={{ color: 'red' }}>{errors.content.message}</p>
                                        )}
                                    </>
                                )}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<SendIcon />}
                                sx={{ alignSelf: 'flex-center' }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>

                </Grid>
                <Grid size={2}>

                </Grid>
            </Grid>
        </Box>
    )

}

export default memo(CreatePost)
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Button,
    Divider,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import { EmojiPicker } from "emoji-mart";
import boardApi from "../api/boardApi";

const Board = () => {
    const { boardId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sections, setSections] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);
    const [icon, setIcon] = useState("");

    useEffect(() => {
        const getBoard = async () => {
            try {
                const res = await boardApi.getOne(boardId);
                setTitle(res.title);
                setDescription(res.description);
                setSections(res.sections);
                setIsFavourite(res.favourite);
                setIcon(res.icon);
            } catch (err) {
                alert(err);
            }
        };
        getBoard();
    }, [boardId]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <IconButton variant="outlined">
                    {isFavourite ? (
                        <StarOutlinedIcon color="warning" />
                    ) : (
                        <StarBorderOutlinedIcon />
                    )}
                </IconButton>
                <IconButton variant="outlined" color="error">
                    <DeleteOutlinedIcon />
                </IconButton>
            </Box>
            <Box sx={{ padding: "10px 50px" }}>
                <Box>
                    {/* emoji picker */}
                    <TextField
                        value={title}
                        placeholder="Untitled"
                        variant="outlined"
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-input": { padding: 0 },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "unset ",
                            },
                            "& .MuiOutlinedInput-root": {
                                fontSize: "2rem",
                                fontWeight: "700",
                            },
                        }}
                    />
                    <TextField
                        value={description}
                        placeholder="Add a description"
                        variant="outlined"
                        multiline
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-input": { padding: 0 },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "unset ",
                            },
                            "& .MuiOutlinedInput-root": { fontSize: "0.8rem" },
                        }}
                    />
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button>Add section</Button>
                        <Typography variant="body2" fontWeight="700">
                            {sections.length} Section
                        </Typography>
                    </Box>
                    <Divider sx={{ margin: "10px 0" }} />
                    {/* Kanban board */}
                </Box>
            </Box>
        </>
    );
};

export default Board;

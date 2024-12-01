import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { commonJavanese, phoneticMap } from "./data";
import "./style.css";

const STORAGE_KEY = "previous_phonetic_input";

interface BtnInputProps {
    character: string;
    onClick: () => void;
}

const BtnInput: FC<BtnInputProps> = ({ character, onClick }) => (
    <Chip
        onClick={onClick}
        sx={{
            m: 1,
            pt: 0.8,
            pb: 0.8,
            pl: 0.6,
            pr: 0.6,
            fontSize: "1.3rem",
        }}
        label={
            <span
                className="phonetic"
                style={{
                    fontSize: "1.3rem",
                }}
            >
                {character === " " ? "space" : character}
            </span>
        }
    />
);

interface PreviousDataProps {
    addValue: (value: string) => void;
}

const PreviousData: FC<PreviousDataProps> = ({ addValue }) => {
    const [data, setData] = useState<string[]>([]);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <>
            {data.map((item, idx) => (
                <BtnInput
                    key={idx}
                    character={item}
                    onClick={() => {
                        remember(item);
                        addValue(item);
                    }}
                />
            ))}
        </>
    );
};

function remember(text: string): void {
    try {
        let previousData: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

        if (!previousData.includes(text)) {
            previousData.unshift(text);
        }

        if (previousData.length > 20) {
            previousData.pop();
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(previousData));
    } catch (error) {
        console.error(error);
    }
}

interface TextToPhoneticProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

interface InputPhoneticProps {
    addValue: (value: string) => void;
    useRemember?: boolean;
    dataDefault?: string[] | { label: string; data: string }[];
    height?: string;
    sx?: Record<string, any>;
    [key: string]: any;
}

export const InputPhonetic: FC<InputPhoneticProps> = ({
    addValue,
    useRemember = true,
    dataDefault = commonJavanese,
    height = "300px",
    sx = {},
    ...rest
}) => {
    const sxDefault = {
        maxWidth: "500px",
    };

    const [data, setData] = useState(dataDefault);
    const [more, setMore] = useState(false);

    return (
        <Box sx={{ ...sx, ...sxDefault }} {...rest}>
            <Toolbar sx={{ padding: "0px!important", overflow: "auto" }}>
                <Button
                    onClick={() => {
                        if (more) {
                            setData(dataDefault);
                            setMore(false);
                        } else {
                            setData(phoneticMap);
                            setMore(true);
                        }
                    }}
                    size="small"
                    color="inherit"
                    startIcon={more ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                    {more ? "Less" : "More"}
                </Button>
                {useRemember && <PreviousData addValue={addValue} />}
            </Toolbar>

            <Card
                sx={{
                    overflowY: "scroll",
                    height: height,
                }}
            >
                <CardContent>
                    {more && (
                        <Typography variant="body1" gutterBottom>
                            You can scroll down
                        </Typography>
                    )}

                    {data.map((item, idx) => {
                        if (typeof item === "string") {
                            return (
                                <BtnInput
                                    key={idx}
                                    character={item}
                                    onClick={() => {
                                        if (useRemember) {
                                            remember(item);
                                        }
                                        addValue(item);
                                    }}
                                />
                            );
                        } else {
                            return (
                                <div key={idx}>
                                    <Typography variant="body1" gutterBottom>
                                        {item.label}
                                    </Typography>
                                    {item.data.split("").map((itemChild, index) => (
                                        <BtnInput
                                            key={index}
                                            character={itemChild}
                                            onClick={() => {
                                                if (useRemember) {
                                                    remember(itemChild);
                                                }
                                                addValue(itemChild);
                                            }}
                                        />
                                    ))}
                                </div>
                            );
                        }
                    })}
                </CardContent>
            </Card>
        </Box>
    );
};
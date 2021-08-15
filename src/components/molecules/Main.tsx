import React, { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from "react";
import { useQuery } from "@apollo/client";
import { CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from "@material-ui/core";
import styled from "styled-components";
import { github_repo } from "../../queries";
import { useDispatch, useSelector } from "react-redux";
import { changeTopic } from '../../store/topic/topic.action';
import { selectName } from "../../store/topic/topic.selector";

const SpinnerContainer = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: center;
  margin-top: "1rem";
  margin: 0 auto;
  width: 50px;
  `;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    table: {
        minWidth: 500,
    },
    bold: {
        fontWeight: 600,
    },
    searchInput: {
        '& > *': {
            margin: theme.spacing(1),
            width: '20rem',
        }
    },
}));

const Main = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const defaultTopic = useSelector(selectName()) as string;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [topic, setTopic] = useState<string | undefined>(defaultTopic || 'react');
    const [rows, setRows] = useState([]);
    const [textSearch, setTextSearch] = useState<string | undefined>();
    const { data = {}, loading, error } = useQuery(github_repo, {
        variables: {
            search: `topic:${topic} sort:stars-desc`,
        },
    });

    const { search = { edges: [] } } = data;

    useEffect(() => {
        if (!defaultTopic) return;
        setTopic(defaultTopic);
    }, [defaultTopic]);

    useEffect(() => {
        if (!loading) {
            setRows(search.edges);
        }
    }, [loading, search.edges]);

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (name: string) => {
        dispatch(changeTopic(name));
        setTopic(name);
        setTextSearch('');
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTextSearch(event.target.value);
    }

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(changeTopic(textSearch));
        setTopic(textSearch);
    }

    if (error) {
        return (
            <div>
                {error.message}
            </div>
        );
    }

    if (loading) {
        return (
            <SpinnerContainer>
                <CircularProgress />
            </SpinnerContainer>
        );
    }

    return (
        <div className={classes.root}>
            {rows.length === 0 &&
                <form className={classes.searchInput} noValidate autoComplete="off" onSubmit={handleOnSubmit}>
                    <TextField id="filled-basic" value={textSearch}
                        label="Search for a new repository" variant="filled" placeholder="Redux, Webpack, Typescript..."
                        onChange={handleOnChange}
                    />
                </form>
            }
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.bold} >Repository</TableCell>
                            <TableCell className={classes.bold} align="right">Starts</TableCell>
                            <TableCell className={classes.bold} align="right">Forks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row: any) => (
                            <TableRow key={row.node.id} hover onClick={() => handleRowClick(row.node.name)}>
                                <TableCell component="th" scope="row">
                                    {row.node.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.node.stargazerCount}
                                </TableCell>
                                <TableCell align="right">
                                    {row.node.forkCount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: 5 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Main;
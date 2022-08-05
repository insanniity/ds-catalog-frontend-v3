import {
    Avatar,
    Button,
    ButtonGroup,
    ClickAwayListener,
    Divider,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography
} from "@mui/material";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {logout, useAuth} from "store/slices/authSlices";
import {useAppDispatch} from "store/store";


const AuthMenu = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const auth = useSelector(useAuth);
    const dispatch = useAppDispatch()


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    const signOut = () => {
        dispatch(logout())
    }

    return (
        <>
            <ButtonGroup variant="contained" disableElevation  ref={anchorRef} aria-label="split button">
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleToggle}
                >
                    <Typography sx={{mr:1}}>
                        {auth.name}
                    </Typography>
                    <Avatar>{auth.name && auth.name[0]}</Avatar>
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem sx={{minWidth: 100}}>
                                        <Divider />
                                        <MenuItem onClick={() => signOut()}>
                                            Sair
                                        </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default AuthMenu;
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
    Popper
} from "@mui/material";
import {useAuth} from "contexts/AuthContext";
import {useRef, useState} from "react";


const AuthMenu = () => {
    const {name, signOut} = useAuth();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);

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
    return (
        <>
            <ButtonGroup variant="contained" disableElevation  ref={anchorRef} aria-label="split button">
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleToggle}
                >
                    <Avatar>{name[0]}</Avatar>
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
                                        <MenuItem disabled={true}>
                                            {name}
                                        </MenuItem>
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
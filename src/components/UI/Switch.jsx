import ReactSwitch from 'react-switch';
import classes from './switch.module.css';
import { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeActions } from '../../store/darkModeSlice';

const Switch = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(state=>state.theme.isDarkMode);
    const [checked, setChecked] = useState(isDarkMode);
    const handleChange = nextChecked => {
      setChecked(nextChecked);
      dispatch(themeActions.toggleMode());
    };
    return (
        <Fragment>
            <label>
            <span>{checked ? "Dark" : "Light"}</span>
            <ReactSwitch
              onChange={handleChange}
              checked={checked}
              className={classes['react-switch']}
            />
          </label>
        </Fragment>
      );
}

export default Switch;
/**
 *
 * AddAddOrganizationsButton
 *
 */
import StyledRaisedButton from 'components/StyledRaisedButton';

const AddOrganizationsButton = StyledRaisedButton.extend.attrs({
  style: {
    minWidth: '10%',
  },
})`
   margin-top: 2vh;
`;

AddOrganizationsButton.propTypes = {};

export default AddOrganizationsButton;

import dynamic from 'next/dynamic';
import React, {Component, Fragment} from 'react'
import {MyButton} from "../MyButton";

const DropzoneDialog = dynamic(async () => {
  const { DropzoneDialog } = await import('material-ui-dropzone')
  return DropzoneDialog
}, { ssr: false });

export default class DropzoneDialogCustom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleSave(file) {
    this.setState({
      open: false
    });
    this.props.onSave(file);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <Fragment>
        <MyButton disabled={this.props.disabled} icon="cloud_upload" onClick={this.handleOpen.bind(this)}>
          subir audio
        </MyButton>
        <div id="#dropzone">
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={['audio/*']}
          filesLimit={1}
          maxFileSize={5000000}
          onClose={this.handleClose.bind(this)}
          showFileNamesInPreview={true}
          dropzoneText="Arrastrá tu audio acá o hacé click"
          dialogTitle={""}
        />
        </div>
        <style jsx>{`
          #dropzone {
            width: 50vw;
          }
        `}
        </style>
      </Fragment>
    );
  }
}

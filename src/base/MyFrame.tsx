import * as React from 'react';

export interface MyFrameProps {
    children?: any;
}

export type FrameStateKeys = 'device' | 'scale' | 'orientation' | 'deviceColor';
export interface MyFrameState {
    device: number;
    scale: number;
    orientation: number;
    deviceColor: number;
    [key: string]: number;
}

const buttons: { [s: string]: string[]; } = {
    device: ['iPhone 8'],
    scale: ['25%', '50%', '75%', '100%'],
    orientation: ['portrait', 'landscape'],
    deviceColor: ['black', 'white']
};

const urlify = (str: string): string => (
    (str || '').toLowerCase().replace('%', '').replace(' ', '')
)

export class MyFrame extends React.PureComponent<MyFrameProps, MyFrameState> {
    constructor(props: MyFrameProps) {
        super(props);

        this.state = {
            device: 0,
            scale: 2,
            orientation: 0,
            deviceColor: 0
        };
    }

    componentDidMount() {
        console.log('MOUNT');
        // use url to determine src
        // rebundle from src and save to zip
        // make post request and save zip to 
    }

    handleClick = (e: any) => {
        // console.log(e.target);
        const myClass = e.target.className;
        const id = e.target.id.replace(myClass, '');

        console.log(id, myClass);
        this.setState({ [myClass]: Math.floor(parseInt(id, 10)) })
    }

    render() {
        console.log(this.props.children);

        const publicKey = '7ngm2qqmwybqx0z8zgdhhwn0km';
        const src = Object.keys(this.state).reduce((arr: string[], key) => {
            const val = urlify(buttons[key][this.state[key]]);
            const str = `${key}=${val}`;
            return [...arr, str];
        }, [`https://appetize.io/embed/${publicKey}?autoplay=true`]).join('&');

        const myButtons = Object.keys(buttons).map((key: string, i: number) => (
            <div key={key}>
                {buttons[key].map((val: string, j: number) => (
                    <button className={key} id={`${key}${j}`} key={`${key}${j}`} onClick={this.handleClick} style={{ color: (this.state[key] === j) ? 'purple': 'black' }}>
                        {val}
                    </button>
                ))}
            </div>
        ));

        return (
            <div>
                <div>
                    {myButtons}
                </div>
                <iframe
                    src={src}
                    width='800px'
                    height='800px'
                    frameBorder='0'
                    scrolling='no'>
                </iframe>
            </div>
        );
    }
}
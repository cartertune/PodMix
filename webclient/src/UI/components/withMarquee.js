import { uniqueId } from "lodash";
import React from "react";
import _ from "lodash";

const withMarquee = (TargetComponent) =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.id = _.uniqueId("text-");
      this.state = {
        elementLoaded: false,
      };
    }

    componentDidMount() {
      console.log(this.state);
      console.log(document.getElementById(this.state.id));
      //   const checkExist = setInterval(function() {
      //     console.log("checking for: ", this.state.id);
      //     if (document.getElementById(this.state.id)) {
      //       console.log("Exists!");
      //       clearInterval(checkExist);
      //     }
      //   }, 100);
    }

    isMarqueeNeeded() {
      const element = document.getElementById(this.id);
      if (!element) {
        return false;
      }
      var overflowX = element.offsetWidth < element.scrollWidth,
        overflowY = element.offsetHeight < element.scrollHeight;

      return overflowX || overflowY;
    }
    render() {
      const { marquee } = this.props;

      if (marquee && this.isMarqueeNeeded()) {
        return (
          <div className="marquee-container">
            <TargetComponent elementId={this.id} {...this.props} />
          </div>
        );
      }
      const compProps = _.clone(this.props);
      delete compProps.marquee;
      return (
        <TargetComponent
          elementId={this.id}
          {...compProps}
          onLoad={() => console.log("hii")}
        />
      );
    }
  };

export default withMarquee;

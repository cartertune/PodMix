import { uniqueId } from "lodash";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const withMarquee = (TargetComponent) =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.id = uuidv4();
      this.state = {
        elementLoaded: false,
      };
    }

    componentDidMount() {
      const id = this.id;
      const onFound = () => this.forceUpdate();
      const checkExist = setInterval(function() {
        if (document.getElementById(id)) {
          onFound();
          clearInterval(checkExist);
        }
      }, 100);
    }

    getElement() {
      return document.getElementById(this.id);
    }

    isMarqueeNeeded() {
      const element = this.getElement();
      if (!element) {
        return false;
      }
      var overflowX = element.offsetWidth < element.scrollWidth,
        overflowY = element.offsetHeight < element.scrollHeight;
      return overflowX || overflowY;
    }

    addAnimation() {
      const element = this.getElement();

      element.animate(
        [
          { left: 0 },
          {
            transform: `translateX(-${element.scrollWidth -
              element.offsetWidth}px)`,
          },
        ],
        {
          duration: 3500,
          iterations: Infinity,
          direction: "alternate",
        }
      );
    }

    render() {
      const { marquee } = this.props;

      if (marquee && this.isMarqueeNeeded()) {
        this.addAnimation();
        return (
          <div className="marquee-container">
            <TargetComponent elementId={this.id} {...this.props} />
          </div>
        );
      }
      const compProps = _.clone(this.props);
      delete compProps.marquee;
      return (
        <div className="overflow-hidden">
          <TargetComponent elementId={this.id} {...compProps} />
        </div>
      );
    }
  };

export default withMarquee;

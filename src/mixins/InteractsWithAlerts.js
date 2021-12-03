export default {
  data() {
    return {
      alert: {
        show: false,
        heading: "",
        body: "",
        type: "",
        lines: [],
      },
    };
  },
  methods: {
    success(heading, body) {
      this.alert.heading = heading;
      this.alert.body = body;
      this.alert.show = true;
      this.alert.type = "success";
    },
    error(heading, body, lines) {
      this.alert.heading = heading;
      this.alert.body = body;
      this.alert.show = true;
      this.alert.type = "error";
      this.alert.lines = lines;
    },
  },
};

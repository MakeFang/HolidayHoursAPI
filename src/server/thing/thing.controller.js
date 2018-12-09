// #TODO: Implement thing.controller.js.

const Hour = require('./thing.model.js');

const hoursController = {};

hoursController.rootGet = (req, res) => {
  Hour.find({ name: req.user._id }, 'date open close')
      .then((hour) => {
        if (hour.length === 0) {
          res.send('no holiday hours information');
        } else {
          res.send(hour);
        }
      })
      .catch((err) => {
        res.send(err.message);
      });
};

hoursController.rootPost = (req, res) => {
  req.body.name = req.user._id;
  const hour = new Hour(req.body);
  hour.save()
      .then((hours) => {
        res.send(`${hours} is added`);
      })
      .catch((err) => {
        res.send(err.message);
      });
};

hoursController.idGet = (req, res) => {
  res.send('things work');
};

hoursController.idPut = (req, res) => {
  res.send('things work');
};

hoursController.idDelete = (req, res) => {
  res.send('things work');
};

module.exports = hoursController;

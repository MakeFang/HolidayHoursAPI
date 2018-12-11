// #TODO: Implement thing.controller.js.

const Hour = require('./thing.model.js');

const hoursController = {};

hoursController.rootGet = (req, res) => {
  Hour.find({ user: req.user._id }, 'date open close')
      .then((hour) => {
        if (hour.length === 0) {
          res.status(204).json({});
        } else {
          res.json(hour);
        }
      })
      // .catch(next);
      .catch((err) => {
        res.status(500).json({ status: 500, message: err.message });
      });
};

hoursController.rootPost = (req, res) => {
  req.body.user = req.user._id;
  const hour = new Hour(req.body);
  hour.save()
      .then((hours) => {
        res.status(201).json(hours);
      })
      .catch((err) => {
        res.status(500).json({ status: 500, message: err.message });
      });
};

hoursController.idGet = (req, res) => {
  Hour.findOne({ _id: req.params.hoursId })
      .populate('user', 'name username')
      .then((hour) => {
        if (hour) {
          res.json(hour);
        } else {
          res.status(204).json({});
          // res.status(204).json({ message: 'no hours of that ID' });
        }
      })
      .catch((err) => {
        res.status(500).json({ status: 500, message: err.message });
      });
};

hoursController.idPut = (req, res) => {
  Hour.findById(req.params.hoursId)
      .then((hour) => {
        if (String(hour.user) === req.user._id) {
          return Hour.findByIdAndUpdate(req.params.hoursId, req.body, { new: true });
        }
        return res.status(403).json({ status: 403, message: 'You are unauthroized to modify this.' });
      })
      .then((hours) => {
        res.status(200).json(hours);
      })
      .catch((err) => {
        res.status(500).json({ status: 500, message: err.message });
      });
};

hoursController.idDelete = (req, res) => {
  Hour.findById(req.params.hoursId)
      .then((hour) => {
        if (String(hour.user) === req.user._id) {
          return Hour.findByIdAndRemove(req.params.hoursId);
        }
        return res.status(403).json({ status: 403, message: 'You are unauthroized to delete this.' });
      })
      .then((hours) => {
        res.json(hours);
      })
      .catch((err) => {
        res.status(500).json({ status: 500, message: err.message });
      });
};

module.exports = hoursController;

import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

import Time "mo:core/Time";
import Principal "mo:core/Principal";


actor {
  public type Appointment = {
    name : Text;
    phone : Text;
    condition : Text;
    preferredTime : Text;
    timestamp : Time.Time;
  };

  let appointments = Map.empty<Time.Time, Appointment>();

  func checkAdmin(caller : Principal) {
    if (not caller.isAnonymous()) { return };
    Runtime.trap("Access denied: Anonymous user is not allowed admin rights. ");
  };

  public shared ({ caller }) func submitAppointment(name : Text, phone : Text, condition : Text, preferredTime : Text, timestamp : Time.Time) : async () {
    let appointment : Appointment = {
      name;
      phone;
      condition;
      preferredTime;
      timestamp;
    };
    appointments.add(timestamp, appointment);
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    checkAdmin(caller);
    appointments.values().toArray();
  };
};

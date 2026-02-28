import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";

actor {
  public type Inquiry = {
    name : Text;
    phone : Text;
    condition : Text;
    preferredTime : Text;
    timestamp : Int;
  };

  module Inquiry {
    public func compareByTimestamp(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Int.compare(inquiry1.timestamp, inquiry2.timestamp);
    };
  };

  let inquiries = Map.empty<Int, Inquiry>();
  var nextId = 0;

  func checkAdmin(caller : Principal) {
    if (not caller.isAnonymous()) {
      return;
    };
    Runtime.trap("Access denied: Anonymous user is not allowed admin rights.");
  };

  public shared ({ caller }) func submitInquiry(name : Text, phone : Text, condition : Text, preferredTime : Text, timestamp : Int) : async () {
    let inquiry : Inquiry = {
      name;
      phone;
      condition;
      preferredTime;
      timestamp;
    };
    inquiries.add(nextId, inquiry);
    nextId += 1;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    checkAdmin(caller);
    inquiries.values().toArray().sort(Inquiry.compareByTimestamp);
  };
};

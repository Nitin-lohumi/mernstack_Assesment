import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import Button from "@mui/material/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { API } from "./SignUp";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "../store/store";
import { ClipLoader } from "react-spinners";
import PopUp from "./PopUp";
import { Editmodel } from "./EditModal";
import AssignmentDetailModal from "./AssignmentDetailModal";

interface Assignment {
  _id: string;
  userId: string;
  title: string;
  description: string;
  subject: string;
  deadline: string;
}

function Home() {
  const { user, role } = useUserStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");

  const [pageCount, setPageCount] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);
  const params = new URLSearchParams();
  params.append("pageCount", pageCount.toString());
  console.log(params.toString());
  const url = `/api/Assignment/${user?.id}?${params.toString()}`;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["assignments"],
    queryFn: () => API.get(url),
    staleTime: 60 * 1000,
    enabled: !!user?.id,
  });
  const createMutation = useMutation({
    mutationFn: () =>
      API.post("/api/Assignment", {
        title,
        description,
        subject,
        deadline,
        userid: user?.id,
      }),
    onSuccess: () => {
      refetch();
      toast.success("Assignment created successfully");
      setTitle("");
      setDescription("");
      setSubject("");
      setDeadline("");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const handleCreate = () => {
    if (!title || !description || !subject || !deadline) {
      return toast.error("Please fill all fields!");
    }
    const now = new Date();
    const selectedDeadline = new Date(deadline);
    if (selectedDeadline <= now) {
      toast.error("Deadline must be a future date");
      return;
    }
    createMutation.mutate();
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => API.delete(`/api/Assignment/${user?.id}/${id}`),
    onSuccess: () => {
      refetch();
      toast.success("Assignment deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });

  const handleDelete = useCallback((id: string) => {
    deleteMutation.mutate(id);
  }, []);

  const handleOpenDelete = (id: string) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleEdit = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setOpenEdit(true);
  };

  const handleShowModel = (assigment: Assignment) => {
    setSelectedAssignment(assigment);
    setOpen(true);
  };
  useEffect(() => {
    if (pageCount) {
      refetch();
    }
  }, [pageCount]);
  return (
    <div>
      <div className="shadow-gray-500 shadow-xs rounded-2xl mt-5">
        <p className="pl-4 pb-1 p-2 text-md text-gray-600">
          Role:{" "}
          <span className="text-2xs capitalize text-gray-900">{role}</span>
        </p>
        <div className="pl-3 pt-5 font-bold text-2xl">
          Welcome, {user?.name}
        </div>
        <p className="pl-4 pt-4 pb-5 text-gray-500 text-xl">
          Email: {user?.email}
        </p>
      </div>

      {role === "teacher" && (
        <div className="w-full p-2 mt-4 space-y-3">
          <input
            placeholder="Enter assignment title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-none border-gray-300 shadow shadow-gray-300 rounded-2xl text-xl pl-4 p-2"
          />
          <textarea
            name="description"
            value={description}
            placeholder="Enter assignment description"
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full outline-none border-gray-300 shadow shadow-gray-300 rounded-2xl text-xl p-2 resize-none"
          ></textarea>
          <input
            placeholder="Enter subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full outline-none border-gray-300 shadow shadow-gray-300 rounded-2xl text-xl pl-4 p-2"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full outline-none border-gray-300 shadow shadow-gray-300 rounded-2xl text-xl pl-4 p-2"
          />

          <Button variant="contained" onClick={handleCreate}>
            Create Assignment
          </Button>
        </div>
      )}

      {isLoading && (
        <ClipLoader
          size={50}
          color="blue"
          cssOverride={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      )}

      <AnimatePresence>
        {data?.data?.assignments?.length ? (
          data.data.assignments.map((v: Assignment, i: number) => (
            <motion.div
              key={v._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              layout
              className="p-4 rounded-xl cursor-pointer  mt-4 shadow-lg shadow-gray-900 mb-3 border border-gray-400 bg-white"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold capitalize">{v.title}</h2>
                {role === "teacher" && (
                  <div className="flex gap-3 z-50">
                    <MdEditSquare
                      size={26}
                      color="blue"
                      className="cursor-pointer"
                      onClick={() => handleEdit(v)}
                    />
                    <MdDeleteForever
                      size={26}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => handleOpenDelete(v._id)}
                    />
                  </div>
                )}
              </div>
              <p className="text-gray-700 mt-2">
                {v.description.length > 60
                  ? v.description.slice(0, 60)
                  : v.description}
                {v.description.length > 60 && (
                  <span className="font-serif pl-2">{" ...more"}</span>
                )}
              </p>
              <p className="text-gray-700 mt-1 capitalize">
                Subject: <span className="font-thin">{v.subject}</span>
              </p>
              <p className="text-gray-700 mt-1 capitalize">
                Deadline:{" "}
                <span
                  className={`font-medium ${
                    new Date(v.deadline) < new Date()
                      ? "text-red-500"
                      : "text-green-400"
                  }`}
                >
                  {new Date(v.deadline).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p
                className="pt-1 pb-1 text-blue-700 capitalize font-serif cursor-pointer"
                onClick={() => {
                  handleShowModel(v);
                }}
              >
                show
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-center mt-10 text-gray-500 text-lg mb-7">
            No Assignments Available yet
          </p>
        )}
      </AnimatePresence>

      {data?.data?.assignments?.length > 0 && (
        <div className="flex justify-evenly p-3 mt-2">
          <button
            disabled={pageCount === 1}
            onClick={() => {
              setPageCount((prev) => prev - 1);
            }}
            className={`pl-3 p-2 pr-3 rounded-xl text-white ${
              pageCount === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 cursor-pointer"
            }`}
          >
            Prev
          </button>

          <button
            disabled={!data?.data.next}
            onClick={() => setPageCount((prev) => prev + 1)}
            className={`pl-3 p-2 pr-3 rounded-xl text-white ${
              !data?.data.next
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}

      <Editmodel
        setOpen={setOpenEdit}
        open={openEdit}
        userId={user?.id!}
        assignment={selectedAssignment!}
      />
      <PopUp
        DeleteId={deleteId}
        handleDelete={handleDelete}
        isOpen={openDelete}
        setOpen={setOpenDelete}
      />
      <AssignmentDetailModal
        open={open}
        setOpen={setOpen}
        assignment={selectedAssignment!}
      />
    </div>
  );
}

export default Home;
